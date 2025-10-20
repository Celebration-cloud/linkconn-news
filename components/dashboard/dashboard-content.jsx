/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPublisherThunk } from "@/store/publisherSlice";
import { fetchArticleStats } from "@/store/articleSlice";
import { Button, Chip, Card, CardBody, Divider } from "@heroui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

export default function DashboardContent() {
  const { user, isLoaded, isSignedIn } = useUser();
  const dispatch = useDispatch();
  const publisher = useSelector((state) => state.publisher.data);
  const loading = useSelector((state) => state.publisher.loading);
  const { stats } = useSelector((state) => state.article);
  console.log('Article stats:', stats)
  const [revalidate, setRevalidate] = useState(false);

  const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#6366f1"];

  useEffect(() => {
    dispatch(fetchArticleStats());
  }, [dispatch]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.id) {
      dispatch(createPublisherThunk({ userId: user.id }));
    }
  }, [isLoaded, isSignedIn, user?.id, revalidate]);

  const handleRevalidate = () => setRevalidate((prev) => !prev);

  const totals = stats?.totals || {};
  const metrics = stats?.metrics || {};
  const insights = stats?.insights || {};

  return (
    <div className="space-y-6">
      {/* Overall Totals Section */}
      {totals && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card
            shadow="sm"
            className="text-center p-4 bg-gray-100 dark:bg-gray-800"
          >
            <p className="text-sm text-gray-500">Total Articles</p>
            <p className="text-2xl font-semibold">{totals.total || 0}</p>
          </Card>

          <Card
            shadow="sm"
            className="text-center p-4 bg-gray-100 dark:bg-gray-800"
          >
            <p className="text-sm text-gray-500">Published</p>
            <p className="text-2xl font-semibold">{totals.published || 0}</p>
          </Card>

          <Card
            shadow="sm"
            className="text-center p-4 bg-gray-100 dark:bg-gray-800"
          >
            <p className="text-sm text-gray-500">Featured</p>
            <p className="text-2xl font-semibold">{totals.featured || 0}</p>
          </Card>

          <Card
            shadow="sm"
            className="text-center p-4 bg-gray-100 dark:bg-gray-800"
          >
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-semibold">{totals.pending || 0}</p>
          </Card>
        </div>
      )}

      {/* Welcome Section */}
      <Card shadow="sm" className="bg-slate-100 dark:bg-slate-800">
        <CardBody className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <p className="text-2xl">
              Welcome, {user?.firstName || "Publisher"}!
            </p>
            <Chip
              color={
                user?.publicMetadata?.role === "admin" ? "warning" : "success"
              }
              variant="bordered"
            >
              {user?.publicMetadata?.role}
            </Chip>
          </div>
          <p className="text-sm text-gray-500">
            {loading
              ? "Loading your publisher data..."
              : publisher
                ? `You have ${publisher.published} published posts, ${publisher.liked} likes, ${publisher.followers} followers, and you're following ${publisher.following} others.`
                : "No publisher data found."}
          </p>
          <Button
            disabled={loading}
            className="bg-primary text-white"
            onPress={handleRevalidate}
          >
            Revalidate
          </Button>
        </CardBody>
      </Card>

      {/* Analytics Section */}
      {stats && (
        <div className="space-y-8 mt-6">
          {/* Metrics Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card shadow="sm" className="p-4 text-center">
              <p className="font-semibold text-lg">Total Views</p>
              <p>{metrics.totalViews?.toLocaleString() || 0}</p>
            </Card>
            <Card shadow="sm" className="p-4 text-center">
              <p className="font-semibold text-lg">CTR</p>
              <p>{metrics.ctr}%</p>
            </Card>
            <Card shadow="sm" className="p-4 text-center">
              <p className="font-semibold text-lg">Engagement</p>
              <p>{metrics.engagementRate}%</p>
            </Card>
            <Card shadow="sm" className="p-4 text-center">
              <p className="font-semibold text-lg">Likes</p>
              <p>{metrics.totalLikes}</p>
            </Card>
          </div>
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Distribution */}
            <Card shadow="sm" className="p-4">
              <p className="text-lg font-semibold text-center mb-2">
                Category Distribution
              </p>
              <Divider />
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={insights?.categoryStats || []}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {(insights?.categoryStats || []).map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Top Authors */}
            <Card shadow="sm" className="p-4">
              <p className="text-lg font-semibold text-center mb-2">
                Top Authors
              </p>
              <Divider />
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={insights?.topAuthors || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalViews" fill="#3b82f6" />
                  <Bar dataKey="totalLikes" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Device Usage */}
            <Card shadow="sm" className="p-4 md:col-span-2">
              <p className="text-lg font-semibold text-center mb-2">
                Device Usage
              </p>
              <Divider />
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={insights?.topDevices || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="device" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Monthly Trend */}
            <Card shadow="sm" className="p-4 md:col-span-2">
              <p className="text-lg font-semibold text-center mb-2">
                Monthly Publishing Trend
              </p>
              <Divider />
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={insights?.articlesPerMonth || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#6366f1"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
