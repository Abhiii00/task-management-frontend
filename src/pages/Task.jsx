import React, { useState, useEffect } from 'react';
import { getTaskListByUserId, updateTaskStatus } from '../components/Action/api.action';
import PageTitle from '../components/Typography/PageTitle';
import { Toaster, toast } from 'react-hot-toast';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Button,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@windmill/react-ui';


function Task() {
  const [response, setResponse] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1);

  // setup data for every table
  const [dataTable1, setDataTable1] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChangeTable1(p) {
    setPageTable1(p);
  }

  useEffect(() => {
    setDataTable1(response.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage));
  }, [pageTable1, response]);

  useEffect(() => {
    fetchTaskList();
  }, []);

  const fetchTaskList = async () => {
    let res = await getTaskListByUserId();
    if (res.success) {
      setResponse(res.data);
    }
  };


  const changeStatus = async (_id, status) => {
    let res = await updateTaskStatus({ id: _id, status });
    if (res.success) {
      console.log('success')
      fetchTaskList();
    } else {
      console.log('error in status update')
    }
  };

  const openViewModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Toaster />
      <PageTitle>Tasks</PageTitle>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>View</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable1.map((item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{item.title}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.description}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{formatDate(item.date)}</span>
                </TableCell>
                <TableCell>
                  <Badge type={item.priority === 'Normal' ? 'success' : 'danger'}>
                    {item.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge type={item.status === 'Completed' ? 'success' : 'danger'}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    {item.status === 'Pending' ? (
                      <Button
                        className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple"
                        onClick={() => changeStatus(item._id, 'Completed')}
                        layout="link"
                        size="icon"
                        aria-label="Edit"
                      >
                        Complete
                      </Button>
                    ) : (
                      <Button
                        className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple"
                        onClick={() => changeStatus(item._id, 'Pending')}
                        layout="link"
                        size="icon"
                        aria-label="Edit"
                      >
                        Pending
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Button size="small" onClick={() => openViewModal(item)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable1}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

      {selectedTask && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Task Details</ModalHeader>
          <ModalBody>
            <p><strong>Title:</strong> {selectedTask.title}</p>
            <p><strong>Description:</strong> {selectedTask.description}</p>
            <p><strong>Date:</strong> {formatDate(selectedTask.date)}</p>
            <p><strong>Priority:</strong> {selectedTask.priority}</p>
            <p><strong>Status:</strong> {selectedTask.status}</p>
          </ModalBody>
          <ModalFooter>
            <Button layout="outline" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}

export default Task;
