import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from "react"
import axios from 'axios'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import { useSnackbar } from 'notistack';




const endPoint = 'http://localhost:8000/api'


function App() {
  let [todos, setTodos] = useState([])
  let [textInput, setTextInput] = useState([])
  const { enqueueSnackbar } = useSnackbar();
  const [checked, /* setChecked */] = useState({ activeObject: null });


  const toggleActive = (id) => {
   
    if (todos[id] === checked.activeObject) {
      console.log(id)
      return "text active"
    } else {
      return "text inactive"
    }

  };


  /* ----- get todosList -----  */
  useEffect(() => {
    getAllEmployees()
  }, [])

  const getAllEmployees = async () => {
    const response = await axios.get(`${endPoint}/todos`)
    setTodos(response.data)
  }
  /* ----- get todosList -----  */


  /* ----- onClick input empty -----  */
  const clearFrom = () => {
    setTextInput('');
  }
  /* ----- onClick input empty -----  */



  /* ----- function put todo -----  */
  let store = async (e) => {
    e.preventDefault();
    if (textInput.length > 0) {
      await axios.post(`${endPoint}/todo`, { txt: textInput }).then((response) => {
        if (response.status === 201) {
          clearFrom();
          getAllEmployees()
          enqueueSnackbar('Your Todo Added', { variant: 'success' });
        }
      })
    } else {
      enqueueSnackbar('Input is empty please type anything', { variant: 'error' });
    }
  }
  /* ----- function put todo -----  */


  /* ----- function delet -----  */
  let delet = async (id) => {
    await axios.delete(`${endPoint}/todo/${id}`).then((response) => {
      if (response.status === 200) {
        const todoss = todos.filter(todo => todo.id !== id);
        setTodos(todoss)
      }
    })
  }
  /* ----- function delet -----  */




  return (
    <div className="App">
      {/* ----------- navbar ----------- */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">TO-DO LIST</Navbar.Brand>
          <Nav className="ms-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      {/* ----------- navbar ----------- */}
      <br />
      {/* ----------- content ----------- */}
      <div className='allContent'>
        <Container>
          <Row>
            <Col lg="6" md="12" sm="12" className='box m-auto'>
              <div className='title'>TO-DO-LIST</div>

              <div className='inputs d-flex justify-content-between'>
                <Box sx={{
                  width: 500,
                  maxWidth: '100%',
                }}>
                  <TextField
                    fullWidth
                    id="outlined-name"
                    className="inputStyle"
                    label="Enter Todo :"
                    type="text"
                    inputProps={{ maxLength: 50, }}
                    value={textInput}
                    onChange={event => setTextInput(event.target.value)}
                  />
                </Box>

                <Button
                  className="btnAdd"
                  variant="contained"
                  color="success"
                  onClick={(event) => store(event)}>
                  Add
                </Button>

              </div>
              <ul className='ul'>
                {todos.map(function (todo, i) {
                  return <li key={i} value={todo.id} className="li d-flex justify-content-between">
                    <div className='date'>{moment(todo.created_at).format('DD-MM-yyyy :')} </div>
                    <div className={toggleActive(todo.id)}>{todo.txt}</div>
                    <Button variant="contained" color="error" onClick={() => delet(todo.id)} >delete</Button>
                  </li>
                })}
              </ul>

            </Col>
          </Row>
        </Container>
      </div>
      {/* ----------- content ----------- */}



    </div>
  );
}

export default App;
