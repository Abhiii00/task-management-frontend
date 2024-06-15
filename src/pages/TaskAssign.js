import React, { useState, useEffect } from "react";
import {
  getTaskList,
  updateTaskStatus,
  createTask,
  updateTask,
  deleteTask,
  getUserList,
} from "../components/Action/api.action";
import PageTitle from "../components/Typography/PageTitle";
import { Toaster, toast } from "react-hot-toast";
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
  ModalFooter,
  Input,
  Label,
  Select,
} from "@windmill/react-ui";

function Task() {
  const [response, setResponse] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [form, setForm] = useState({
    _id: '',
    title: "",
    description: "",
    date: "",
    priority: "",
    userId: "", 
  });
  const [editMode, setEditMode] = useState(false);
  const [editBenefit, setEditBenefit] = useState(null);
  const [validationError, setValidationError] = useState("");

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

  // on page change, load new sliced data
  useEffect(() => {
    setDataTable1(
      response.slice(
        (pageTable1 - 1) * resultsPerPage,
        pageTable1 * resultsPerPage
      )
    );
  }, [pageTable1, response]);

  useEffect(() => {
    fetchJobBenefitList();
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    let res = await getUserList();
    if (res.success) {
      setUserList(res.data);
    }
  };

  const fetchJobBenefitList = async () => {
    let res = await getTaskList();
    if (res.success) {
      setResponse(res.data);
    }
  };

  const handleDeleteTask = async () => {
    let res = await deleteTask({id: editBenefit});
    if (res.success) {
      console.log(res.msg);
    } else {
      console.log(res.msg);
    }
    setIsDeleteModalOpen(false);
    fetchJobBenefitList();
  };

  const openDeleteModal = (e, _id) => {
    setEditBenefit(_id)
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    fetchJobBenefitList();

  };
  

  const changeStatus = async (e, _id, status) => {
    let res = await updateTaskStatus({ id: _id, status: status });
    if (res.success) {
      console.log(res.msg);
    } else {
      console.log(res.msg);
    }
    fetchJobBenefitList();
  };

  const openModal = () => {
    setEditMode(false);
    setForm({_id: '', title: "", description: "", date: "", priority: "", userId: "" });
    setValidationError("");
    setIsModalOpen(true);
  };

  const openEditModal = (benefit) => {
    setEditMode(true);
    setForm({
      title: benefit.title,
      description: benefit.description,
      date: benefit.date,
      priority: benefit.priority,
      userId: benefit.userId,
    });
    setEditBenefit(benefit._id);
    setValidationError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    const {title, description, date, priority, userId } = form;
    console.log('form', form);
    
    if (
      !title.trim() ||
      !description.trim() ||
      !date.trim() ||
      !priority.trim() ||
      !userId.trim() 
    ) {
      setValidationError("All fields are required");
      return;
    }

    if (editMode) {
      let res = await updateTask({
        id: editBenefit,
        title,
        description,
        date: date,
        priority,
        userId,
      });
      if (res.success) {
        toast.success(res.msg || "Success");
      } else {
        toast.error("Failed to update task");
      }
    } else {
      let res = await createTask({ title, description, date: date, priority, userId });
      if (res.success) {
        toast.success(res.msg || "Success");
      } else {
        toast.error("Failed to add task");
      }
    }
    closeModal();
    fetchJobBenefitList();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (validationError) {
      setValidationError("");
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/20${year}`;
  };

  return (
    <>
      <Toaster />
      <PageTitle>Assign Tasks To User</PageTitle>
      <Button size="small" onClick={openModal}>
        Click To Add Task
      </Button>
<br></br>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {response.map((item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{item.title}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.description}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{formatDate(item.date)}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    type={item.priority === "Normal" ? "success" : "danger"}
                  >
                    {item.priority === "Normal" ? "Normal" : "Highly"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    type={item.status === "Completed" ? "success" : "danger"}
                  >
                    {item.status === "Completed" ? "Completed" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    {item.status === "Pending" ? (
                      <Button
                        className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple"
                        onClick={(e) => changeStatus(e, item._id, "Completed")}
                        layout="link"
                        size="icon"
                        aria-label="Edit"
                      >
                        Completed
                      </Button>
                    ) : (
                      <Button
                        className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple"
                        onClick={(e) => changeStatus(e, item._id, "Pending")}
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
                  <Button size="small" onClick={() => openEditModal(item)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={(e) => openDeleteModal(e, item._id)}
                  >
                    Delete
                  </Button>
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>{editMode ? "Edit Task" : "Add Task"}</ModalHeader>
        <ModalBody>
          <Label>
            <span>Title</span>
            <Input
              className="mt-1"
              name="title"
              value={form.title}
              onChange={handleInputChange}
            />
          </Label>
          <Label>
            <span>Description</span>
            <Input
              className="mt-1"
              name="description"
              value={form.description}
              onChange={handleInputChange}
            />
          </Label>
          <Label>
            <span>Date</span>
            <Input
              type="date"
              className="mt-1"
              name="date"
              value={form.date}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            <span>Priority</span>
            <Select
              className="mt-1"
              name="priority"
              value={form.priority}
              onChange={handleInputChange}
            >
              <option value="">Select Priority</option>
              <option value="Normal">Normal</option>
              <option value="Highly">Highly</option>
            </Select>
          </Label>

          <Label>
            <span>Users</span>
            <Select
              className="mt-1"
              name="userId"
              value={form.userId}
              onChange={handleInputChange}
            >
              <option value="">Select User</option>
              {userList.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </Label>

          {validationError && (
            <p className="text-red-500 text-sm">{validationError}</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button layout="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
          <ModalBody>
          <p style={{'textAlign': "center"}}><strong>Are you sure you want to delete this task?</strong></p>
          </ModalBody>
          <ModalFooter>
          <Button layout="outline" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button onClick={handleDeleteTask}>Delete</Button>
        </ModalFooter>
        </Modal>
    </>
  );
}

export default Task;
