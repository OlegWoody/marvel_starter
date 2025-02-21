import "./searchForm.scss"
import useMarvelService from "../../services/MarvelService"
import { useState } from "react";
import {Form, Field, Formik, ErrorMessage as FormikErrorMessage} from "formik"
import * as Yup from 'yup'
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const SearchForm = () => {
    const [char, setChar] = useState(null)

    const {getCharacterByName, loading, error, clearError} = useMarvelService()

    const sendChar = (value) =>{
        clearError()
        getCharacterByName(value)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) =>{
        setChar(char)
        console.log(char)
    }

    const result = !char ? null : char[0].name ?
            <div className="char__search-wrapper">
                <div className="char__search-success">There is! Visit "{char[0].name}" page?</div>
                <Link to={`/charapter/${char[0].id}`} className="button button__secondary">
                    <div className="char__search-label">Visit</div>
                </Link> 
            </div> : <div className="char__search-error">Charapter is not founded</div>

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{nameChar:''}}
                validationSchema={Yup.object({
                    nameChar: Yup.string().required('This field is required')
                })}
                onSubmit={
                    ({nameChar})=>sendChar(nameChar)
                }
            >
                <Form>
                    <label htmlFor="nameChar" className="char__search-label">
                        Fing a character by name:
                    </label>
                    <div className="char__search-wrapper">
                        <Field
                            id="nameChar"
                            type="text"
                            name="nameChar"
                            placeholder="Enter name"
                        />
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={loading}>
                            <div className="inner" >Search</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="nameChar"/>
                </Form>
            </Formik>
            {result}
        </div>

    );
}


export default SearchForm;