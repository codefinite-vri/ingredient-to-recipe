import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useFormik, Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link} from 'react-router-dom'
import {useAuth} from '../Contexts/AuthContext'
import {useHistory} from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close';
import {submitRecipe} from '../api.js'

const initialValues = {
  recipeName: '',
  servings: '',
  cookTime:'',
  image: '',
  ingredients: [
    {
      amount: '',
      ingName: '',
    },
  ],
  procedure: [
    {
      step: '',
    },
  ],
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    keyboard:false,
    backdrop:"static",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddRecipe() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {currentUser} = useAuth();
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addNewRecipe = async(recipe) =>{
        const result = await submitRecipe(currentUser.displayName,currentUser.email,recipe);//returns true or false
        if(result)
          alert('Recipe submitted successfully')
        else 
          alert('Recipe submission unsuccessful. Please try again later.')
        
          setOpen(false);
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      addNewRecipe(values);
    },
  });

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        react-transition-group
      </button> */}
      <Link className="btn SendBtn" onClick={handleOpen}>Add Recipe</Link>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <h1>Add your Own Recipe!</h1>
          <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
    {({ values }) => (
   <Form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="recipeName"
          name="recipeName"
          label="Recipe Name"
          onChange={formik.handleChange}
          value={formik.values.recipeName}
          required="required"
        />
          <TextField
          fullWidth
          id="image"
          name="image"
          label="Image"
          onChange={formik.handleChange}
          value={formik.values.image}
          required="required"
        />
        <TextField
          fullWidth
          id="servings"
          name="servings"
          label="Servings"
          onChange={formik.handleChange}
          value={formik.values.servings}
          required="required"
        />
        <TextField
          fullWidth
          id="cookTime"
          name="cookTime"
          label="Cook Time"
          placeholder="Cook time(in minutes)"
          value={formik.values.cookTime}
          onChange={formik.handleChange}
          required="required"
        />
        <h4 className="title-add">Ingredients</h4>
        
        <FieldArray name="ingredients">
            {({ insert, remove, push }) => (
              <div>
                {values.ingredients.length > 0 &&
                  values.ingredients.map((ingredients, index) => (
                    <div className="row row1" key={index}>
                      <div className="col">
                        <TextField
                          name={`ingredients[${index}].amount`}
                           placeholder="1 cup"
                           type="text"
                          label="Amount"
                          //value={formik.values.ingredients[index].amount}
                          onChange={formik.handleChange}
                          required="required"
                        />
                      </div>
                      <div className="col">
                        <TextField
                          name={`ingredients[${index}].ingName`}
                          placeholder="Sugar"
                          type="text"
                          //value={formik.values.ingredients[index].ingName}
                          label="Ingredient Name"
                          onChange={formik.handleChange}
                          required="required"
                        />
                      </div>
                        <Button
                          type="button"
                          className="Btn-Margin"
                          variant="contained"
                          onClick={() => remove(index)}
                        >
                          <CloseIcon/>
                        </Button>
                    </div>
                  ))} 
                <Button variant="contained"  className="Btn-Margin right-btn"
                  onClick={() => push({ amount: '', ingName: '' })}
                >
                  Add Ingredient
                </Button>
              </div>
            )}
          </FieldArray>
          <h4 className="title-add">Procedure</h4>
          <FieldArray name="procedure">
            {({ insert, remove, push }) => (
              <div>
                {values.procedure.length > 0 &&
                  values.procedure.map((procedure, index) => (
                    <div className="row row1" key={index}>
                      <div className="col">
                      <TextField
                          name={`procedure[${index}].step`}
                          fullWidth
                          placeholder="Add Step Here"
                          type="text"
                          //value={formik.values.procedure[index].step}
                          label="Step"
                          onChange={formik.handleChange}
                          required="required"
                        />
                      </div>
                        <Button
                          type="button"
                           className="Btn-Margin"
                          variant="contained"
                          onClick={() => remove(index)}
                        >
                          <CloseIcon/>
                        </Button>
                    </div>
                  ))}
                <Button
                  type="button" variant="contained"
                  className="Btn-Margin right-btn"
                  onClick={() => push({ step: '' })}
                >
                  Add Step
                </Button>
              </div>
            )}
          </FieldArray>
        <Button color="red" variant="contained"  className="Btn-Margin" fullWidth type="submit"> 
          Submit
        </Button>
      </Form>
       )}
       </Formik>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
