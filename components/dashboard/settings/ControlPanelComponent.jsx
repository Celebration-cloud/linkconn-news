"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  inviteUserThunk,
  fetchInvitedUsersThunk,
  updateUserRoleThunk,
  banUserThunk,
  unbanUserThunk,
} from "@/store/controlPanelSlice";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Select,
  SelectItem,
  User,
} from "@heroui/react";

import { useRouter } from "next/navigation";
import { SpinnerLoading } from "@/components/spinner-loading";

// ✅ Table columns
const columns = [
  { name: "EMAIL", uid: "email", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "CREATED", uid: "createdAt", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

// ✅ Status chips color map
const statusColorMap = {
  accepted: "success",
  pending: "warning",
  banned: "danger",
};

export default function ControlPanel() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { invitedUsers, loading, allInvite } = useSelector((state) => state.controlPanel);
  console.log(invitedUsers, allInvite)
  // Local states
  const [openInvite, setOpenInvite] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("writer");
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch users on mount
  useEffect(() => {
    dispatch(fetchInvitedUsersThunk());
  }, [dispatch]);

  // Invite user
  const handleInvite = () => {
    if (!email) return;
    dispatch(inviteUserThunk({ email, role }));
    setEmail("");
    setRole("writer");
    setOpenInvite(false);
  };

  // Update role
  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUserRoleThunk({ userId, role: newRole }));
  };

  // Ban / Unban
  const handleToggleBan = (user) => {
    if (user.banned) {
      dispatch(unbanUserThunk(user.id));
    } else {
      dispatch(banUserThunk(user.id));
    }
  };

  // Format created date
  const formatDate = (value) => {
    if (!value) return "N/A";

    let date;

    // If it's already a number-like timestamp
    if (typeof value === "number" || /^\d+$/.test(value)) {
      date = new Date(Number(value));
    }
    // If it's an ISO string (or any string date)
    else if (typeof value === "string") {
      date = new Date(value);
    }

    // Validate and return formatted date
    return isNaN(date?.getTime()) ? "Invalid date" : date.toLocaleDateString();
  };

  // Go back
  const handleBack = () => {
    router.back();
  };

  // ✅ Filtering + pagination
  const filteredUsers = useMemo(() => {
    if (!filterValue) return invitedUsers;
    return invitedUsers.filter((user) =>
      user.email.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [invitedUsers, filterValue]);

  const pages = Math.ceil(filteredUsers.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [page, filteredUsers, rowsPerPage]);

  // ✅ Table cell renderer
  const renderCell = useCallback((user, columnKey) => {
    switch (columnKey) {
      case "email":
        return (
          <User
            name={`${user.firstName ?? ""} ${user.lastName ?? ""}`}
            description={user.email}
            avatarProps={{
              radius: "full",
              src: `https://i.pravatar.cc/150?u=${user.email}`,
            }}
          />
        );
      case "role":
        return (
          <div>
            {user.role === "user" && "-"}
            {user.role !== "user" && (
              <Select
                defaultSelectedKeys={[user.role]}
                size="sm"
                className="w-28"
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
              >
                <SelectItem key="admin">Admin</SelectItem>
                <SelectItem key="writer">Writer</SelectItem>
              </Select>
            )}
          </div>
        );
      case "status":
        return (
          <Chip
            size="sm"
            color={
              user.banned ? "danger" : statusColorMap[user.status] || "default"
            }
          >
            {user.banned ? "Banned" : user.status}
          </Chip>
        );
      case "createdAt":
        return formatDate(user.createdAt);
      case "actions":
        return (
          <div className="flex gap-2">
            {user.role === "user" && "-"}
            {user.role !== "user" && (
              <Button
                size="sm"
                color={user.banned ? "success" : "danger"}
                onPress={() => handleToggleBan(user)}
              >
                {user.banned ? "Unban" : "Ban"}
              </Button>
            )}
          </div>
        );
      default:
        return user[columnKey];
    }
  }, []);

  return (
    <div className="p-6">
      <div className="flex gap-4 items-center justify-between mb-4">
        <div className="flex gap-4 items-center">
          <span
            onClick={handleBack}
            className="text-2xl pi pi-angle-left mr-2 cursor-pointer"
          ></span>
          <h1 className="text-2xl font-bold text-blue-700">Control Panel</h1>
        </div>

        {/* Invite button */}
        <Button color="primary" onPress={() => setOpenInvite(true)}>
          <i className="pi pi-user-plus mr-2"></i> Invite User
        </Button>
      </div>

      <h3 className="text-xl font-semibold mb-2 text-blue-600">
        Invited Users
      </h3>

      {loading && <SpinnerLoading />}
      {!loading && invitedUsers?.length === 0 && (
        <p className="text-gray-500">No invited users yet.</p>
      )}

      {/* ✅ HeroUI Table */}
      {!loading && invitedUsers?.length > 0 && (
        <Table
          aria-label="Invited Users Table"
          topContent={
            <div className="flex justify-between items-center mb-2">
              <Input
                placeholder="Search by email..."
                value={filterValue}
                onValueChange={setFilterValue}
                isClearable
                size="sm"
              />
              <label className="flex items-center gap-1 text-sm text-default-500">
                Rows per page:
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setPage(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </label>
            </div>
          }
          bottomContent={
            <Pagination
              showControls
              page={page}
              total={pages}
              onChange={setPage}
            />
          }
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                allowsSorting={column.sortable}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
            {(user) => (
              <TableRow key={user.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(user, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Invite Modal (unchanged) */}
      <Modal isOpen={openInvite} onOpenChange={setOpenInvite}>
        <ModalContent>
          <ModalHeader>Invite User</ModalHeader>
          <ModalBody>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Select
              selectedKeys={[role]}
              onChange={(e) => setRole(e.target.value)}
            >
              <SelectItem key="admin">Admin</SelectItem>
              <SelectItem key="writer">Writer</SelectItem>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={() => setOpenInvite(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleInvite}>
              Invite
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export const revalidate = 0