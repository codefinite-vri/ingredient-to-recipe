import React from 'react';
import { useFormik, Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link} from 'react-router-dom'
import {useAuth} from '../Contexts/AuthContext'
import {useHistory} from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
import {submitRecipe} from '../api.js'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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

export default function AddRecipe(props) {
  const [open, setOpen] = React.useState(false);
  const {currentUser} = useAuth();
  const history = useHistory();
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const addNewRecipe = async(recipe) =>{
        const result = await submitRecipe(currentUser.displayName,currentUser.email,recipe);//returns true or false
        if(result)
          alert('Recipe submitted successfully')
        else 
          alert('Recipe submission unsuccessful. Please try again later.')
          setOpen(false);
          props.setRerender(true)
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
      <Link className="btn SendBtn" onClick={handleClickOpen('paper')}>Add Recipe</Link>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
      <DialogTitle id="scroll-dialog-title"><h2>ADD YOUR OWN RECIPES<Button className="float-right" onClick={handleClose}><CancelIcon className="black-cred-cancel" style={{fontSize: 35}}/></Button></h2> </DialogTitle>
         <DialogContent dividers={scroll === 'paper'}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
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
          required="required"
        />
          <TextField
          fullWidth
          id="image"
          name="image"
          label="Image"
          onChange={formik.handleChange}
          required="required"
        />
        <TextField
          fullWidth
          id="servings"
          name="servings"
          label="Servings"
          onChange={formik.handleChange}
          required="required"
        />
        <TextField
          fullWidth
          id="cookTime"
          name="cookTime"
          label="Cook Time"
          placeholder="Cook time(in minutes)"
          onChange={formik.handleChange}
          required="required"
        />
        <h5 className="title-add">INGREDIENTS</h5>
        
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
                          label="Name"
                          onChange={formik.handleChange}
                          required="required"
                        />
                      </div>
                        <Button
                          type="button"
                          className="Btn-Margin cancel-btn-recipe btn-red"
                          variant="contained"
                          onClick={() => remove(index)}
                        >
                          <CloseIcon/>
                        </Button>
                    </div>
                  ))} 
                <Button variant="contained"  className="Btn-Margin right-btn btn-red"
                  onClick={() => push({ amount: '', ingName: '' })}
                >
                  Add Ingredient
                </Button>
              </div>
            )}
          </FieldArray>
          <h5 className="title-add">PROCEDURE</h5>
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
                           className="Btn-Margin cancel-btn-recipe btn-red"
                          variant="contained"
                          onClick={() => remove(index)}
                        >
                          <CloseIcon/>
                        </Button>
                    </div>
                  ))}
                <Button
                  type="button" variant="contained"
                  className="Btn-Margin right-btn btn-red"
                  onClick={() => push({ step: '' })}
                >
                  Add Step
                </Button>
              </div>
            )}
          </FieldArray>
        <Button color="red" variant="contained"  className="Btn-Margin btn-red" fullWidth type="submit"> 
          Submit
        </Button>
      </Form>
       )}
       </Formik></DialogContentText>
        </DialogContent></Dialog>
    </div>
  );
}
