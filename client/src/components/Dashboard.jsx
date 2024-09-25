import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Accordion,
  ListGroup,
  Table
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AddExpenses, checkToken, GetItemsByUserId, LoggedInData, updateExpense } from "../Services/DataService";
import Spinner from 'react-bootstrap/Spinner';



const Dashboard = ({ isDarkMode, onLogin }) => {
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0)
  const [expenseCategory, setExpenseCategory] = useState("");

  const [edit, setEdit] = useState(false);

  const [userId, setUserId] = useState(0);
  const [publisherName, setPublisherName] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [expenseItems, setExpenseItems] = useState([]);

  const [expenseId, setExpenseId] = useState(0);
  const [isDeleted, setisDeleted] = useState(false);
  const [isPublished, setIsPublished] = useState(false);



  const handleSave = async ({target:{textContent}}) => {
    let {publisherName, userId} = LoggedInData();
    const published = {
      Id:edit ? expenseId : 0,
      description: expenseDescription,
      amount: expenseAmount,
      Category: expenseCategory,
      UserId: userId,
      PublisherName: publisherName,
      IsPublished: textContent === "Save" || textContent == "Save Changes" ? false : true,
      IsDeleted: false,
    };
    console.log(published);
    handleClose();
    let result = false;
    if(edit){
      result = await updateExpense(published)
      loadUserData();
    }else{
      result = await AddExpenses(published);
      loadUserData();
    }

    if(result){
      let userExpenses = await GetItemsByUserId(userId);
      setExpenseItems(userExpenses);
      console.log(userExpenses);
      
    }else{
      alert(`Expense item ${edit ? "Update" : "Added"}`)
    }

    
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);


  const handleShow = (e, {id,publisherName,userId, description, category, amount}) => {
    setShow(true);

    if (e.target.textContent === "Add Expense Item") {
      setEdit(false);
      console.log(e.target.textContent, edit);
    } else {
      setEdit(true);
      
    }
    setExpenseId(id);
    setExpenseDescription(description);
    setUserId(userId);
    setPublisherName(publisherName);
    setExpenseCategory(category);
    setExpenseAmount(amount);
    setisDeleted(isDeleted);
    setIsPublished(isPublished);
    console.log(e.target.textContent, edit);

    console.log(e.target.textContent, edit);
  };

  const handleDescription = (e) => {
    setExpenseDescription(e.target.value);
  };
  const handleAmount = (e) => {
    setExpenseAmount(e.target.value);
  };
  const handleCategory = (e) => {
    setExpenseCategory(e.target.value);
  };


  let navigate = useNavigate();


  const loadUserData = async () => {
    
    let userInfo = LoggedInData();
    onLogin(userInfo);
    setUserId(userInfo.userId);
    setPublisherName(userInfo.publisherName);
    console.log(userInfo);
    setTimeout( async () => {
      let userExpenses = await GetItemsByUserId(userInfo.userId);
      console.log(userExpenses);
      setExpenseItems(userExpenses);
      setUserId(userId);
      setIsLoading(false);
    }, 1000)
    
  }

useEffect(() => {
  if(!checkToken())
  {
    navigate('/Login')
  } else{

    loadUserData();
  }
}, [])





const handleDelete = async (item) => {
  item.isDeleted = !item.isDeleted;
  let result = await updateExpense(item);
  if (result){
    let ExpenseItems = await GetItemsByUserId(item.userId);
    setExpenseItems(ExpenseItems);
  }else{
    alert(`Expense Items not ${edit ? "Updated" : "Added"}`)
  }
}

  return (
    <>
      <Container className="p-5 pt-0">
        <Container className="d-flex justify-content-end mb-3">

        <Button className="mt-5" variant="primary" onClick={(e) => handleShow(e, {id:0,userId:userId, description:"", Category:"",IsDeleted:false,isPublished:false,publisherName:publisherName})}>
          Add Expense Item
        </Button>
        </Container>

        <Modal
          data-bs-theme={isDarkMode ? "dark" : "light"}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>{edit ? "Edit" : "Add"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={expenseDescription}
                  onChange={handleDescription}
                />
              </Form.Group>

              <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Amount</Form.Label>
              <Form.Control placeholder="Enter Amount" value={expenseAmount} onChange={handleAmount}/>
            </Form.Group>

              <Form.Group controlId="Category">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  
                  value={expenseCategory}
                  onChange={handleCategory}
                >
                  <option>Select Category</option>
                  <option value={"Groceries"}>Groceries</option>
                <option value={"Utilities"}>Utilities</option>
                <option value={"Entertainment"}>Entertainment</option>
                <option value={"Food"}>Food</option>
                <option value={"Shopping"}>Shopping</option>
                </Form.Select>
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outline-primary" onClick={handleSave}>
              {edit ? "Save Changes" : "Save Expense"} 
            </Button>
          </Modal.Footer>
        </Modal>

        { isLoading ? <>
          <Spinner animation="grow" variant="info" /> <h2>...Loading</h2> 
        </> 
        :
         expenseItems.length == 0 ? <>
        <h2 className="text-center">No Expenses to Show.</h2> 
        </>
        :


        <Table bordered className={isDarkMode ? "border-light my-2 table-dark" : "border-dark my-2 table-light"} border={5} size="sm">
           <thead className="">
            <tr>
              <th className="text-center">ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {expenseItems.map((expense) => (

                <tr key={expense.id}>
                  <td className="text-center">{expense.id}</td>
                  <td>{expense.description}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.category}</td>
                  <td width={"25%"}>
                  <Button className="mx-3" variant="outline-danger" onClick={() => handleDelete(expense)}>Delete</Button>
                  <Button className="mx-3" variant="outline-info" onClick={(e) => handleShow(e,expense)}>Edit</Button>
                  </td>
                </tr>
              
            ))}
          </tbody>
        </Table>

      
      }
      </Container>
    </>
  );
};

export default Dashboard;
