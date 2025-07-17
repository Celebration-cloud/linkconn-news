import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@heroui/react";

const PreviewModal = ({ open, onClose, title, summary, cover, content }) => (
  <Modal
    isOpen={open}
    onClose={onClose}
    placement="center"
    size="sm"
    scrollBehavior="inside"
    hideCloseButton
    backdrop="blur"
  >
    <ModalContent>
      <div className="w-[375px] h-[667px] bg-white dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-700 shadow-xl overflow-y-scroll scrollbar-hide">
        <ModalHeader className="text-center text-lg font-semibold border-b border-gray-200 dark:border-gray-700">
          📱 Article Preview
        </ModalHeader>
        <ModalBody className="overflow-y-auto p-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{summary}</p>
          {cover && (
            <img
              src={cover}
              alt="Preview Cover"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          )}
          <div
            className="prose dark:prose-invert max-w-none text-sm"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </ModalBody>
        <ModalFooter className="flex justify-center">
          <Button
            variant="flat"
            onPress={onClose}
            className="text-blue-600 hover:underline"
          >
            Close Preview
          </Button>
        </ModalFooter>
      </div>
    </ModalContent>
  </Modal>
);

export default PreviewModal;