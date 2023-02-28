import React, {useState,useEffect} from 'react';
import "./Form.css";
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

const Form = () => {

    const initialvalues={
        full_name:"",
        roll_no:"",
        student_no:"",
        mobile_number:"",
        email:"",
        branch:"",
        year:"",
        gender:"",
        residence:"",
    }

    const [formvalues,setformvalues]=useState(initialvalues);
    const [formerror,setformerror]=useState({});
    const [noerror,setnoerror]=useState(false);
    const [submitcall,setSubmitcall]=useState(false);
    const [captcha_value,setcaptcha_value]=useState("");

    const inputHandler=(e)=>{
        const {name,value}=e.target;
        setformvalues({...formvalues,[name]:value});
    }
    const error=()=>{
        const errors={}
        setnoerror(true);

        //REGEX CONDITIONS

        const regex_name=/^[a-zA-Z]{3,15}(\s[a-zA-Z]{2,10})?$/;
        const regex_contact= /^[6-9]([0-9]){9}$/;
        const regex_roll=/^([0-9]){6}$/;
        const regex_student=/^([0-9]){6}$/;
        const regex_email=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        
        //VALIDATING NAME

        if(regex_name.test(formvalues.full_name.trim())){
          formvalues.full_name=formvalues.full_name.trim();
          errors.full_name="";
        }
        else{
          setnoerror(false);
          errors.full_name="error in name";
        
        }

        //VALIDATING STUDENTNO

        if(regex_student.test(formvalues.student_no.trim())){
          errors.student_no="";
          formvalues.student_no=formvalues.student_no.trim();
        }
        else{
          setnoerror(false);
          errors.student_no="Invalid Student no";
          
        }

        //VALIDATING ROLLNO

        if(regex_roll.test(formvalues.roll_no.trim())){
          errors.roll_no="";
          formvalues.roll_no=formvalues.roll_no.trim();
        }
        else{
          setnoerror(false);
          errors.roll_no="Invalid roll no";
          
        }

        //VALIDATING CONTACT

        if(regex_contact.test(formvalues.mobile_number.trim())){
            errors.mobile_number="";
            formvalues.mobile_number=formvalues.mobile_number.trim();
        }
        else{
            setnoerror(false)
            errors.mobile_number="**Invalid Mobile Number";
            
        }

        //VALIDATING EMAIL

        if(regex_email.test(formvalues.email.trim())){
          errors.email="";
          formvalues.email=formvalues.email.trim();
        }
        else{
          setnoerror(false);
          errors.email="invalid email";
          
        }

        //VALIDATING BRANCH

        if(formvalues.branch==""){
          setnoerror(false);
          errors.branch="Select branch";
          
        }
        else{
          errors.branch="";
          
        }

        //VALIDATING YEAR

        if(formvalues.year==""){
          setnoerror(false);
          errors.year="Select Year";
          
        }
        else{
          errors.year="";
          
        }
  
        //VALIDATING GENDER

        if(formvalues.gender==""){
          setnoerror(false);
          errors.gender="Select gender";
          
        }
        else{
          errors.gender="";
          
        }

        //VALIDATING RESIDENCE
        
        if(formvalues.residence==""){
          setnoerror(false);
          errors.residence="Select residence";
          
        }
        else{
          errors.residence="";
          
        }

        return errors;
    }

    const validateform=(e)=>{
        e.preventDefault();
        setformerror(error());
        if(submitcall==false){
         setSubmitcall(true);
        }
        else{
            setSubmitcall(false);
        }
    }

    useEffect(()=>{
        if(noerror==true){
          if(captcha_value==""){
            alert("gi")
          }
          else{
            axios.post("https://registrationcsi-production.up.railway.app/accounts/register/",{
              
                mobile_number: formvalues.mobile_number,
                email: formvalues.email,
                full_name: formvalues.full_name,
                roll_no: formvalues.roll_no,
                student_no: formvalues.student_no,
                gender: formvalues.gender,
                residence:formvalues.residence,
                year: formvalues.year,
                branch: formvalues.branch,
                recaptcha:captcha_value,
              
            }).then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            })
            console.log(formvalues);
        }
      }
    },[submitcall])

    function validate_captcha(value){
      console.log(value);
      setcaptcha_value(value);
    }
    const alterfunction =()=>{
      // alert("Form submitted");
      let btnreset =document.querySelector('button');
      let input =document.querySelectorAll('input');
      btnreset.addEventListener('click' ,()=>{
        input.forEach(input => input.value =' ');
      });
    }

  return (
    <div>
        <form onSubmit={validateform}>
          <h1>Student number and Rollno must be 6 digit and all Entry Unique</h1>
            <div className='name-sec'>
              <input type="text" placeholder="Name" name="full_name" value={formvalues.full_name} onChange={inputHandler}/>
              <p>{formerror.full_name}</p>
           </div>

           <div className='student_no-sec'>
              <input type="text" placeholder="Student No." name='student_no' value={formvalues.student_no} onChange={inputHandler}/>
              <p>{formerror.student_no}</p>
           </div>

           <div className='roll-sec'>
              <input type="text" placeholder="University Roll No." name='roll_no' value={formvalues.roll_no} onChange={inputHandler}/>
              <p>{formerror.roll_no}</p>
           </div>

           <div className='contact-sec'>
              <input type="text" placeholder="Contact No." name="mobile_number" value={formvalues.mobile_number} onChange={inputHandler}/>
              <p>{formerror.mobile_number}</p>
           </div>

           <div className='email-sec'>
              <input type="text" placeholder="Email" name="email" value={formvalues.email} onChange={inputHandler}/>
              <p>{formerror.email}</p>
           </div>

           <div className='branch-sec'>
              <select name="branch" id="branch" value={formvalues.branch} onChange={inputHandler}>
                <option value="" disabled selected>Branch</option>
                <option value="CSE">CSE</option>
                <option value="CSE(DS)">CSE(DS)</option>
                <option value="CSE(AI-ML)">CSE(AI-ML)</option>
                <option value="CS">CS</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EN">EN</option>
                <option value="ME">ME</option>
                <option value="CIVIL">CIVIL</option>
              </select>
              <p>{formerror.branch}</p>
           </div>

           <div className='year-sec'>
              <select name='year' id='year' value={formvalues.year} onChange={inputHandler}>
                <option value="" selected disabled>Year</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              <p>{formerror.year}</p>
           </div>

           <div className='gender-sec'>
              <select name='gender' id='gender' value={formvalues.gender} onChange={inputHandler}>
              <option value="" selected disabled>Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Others'>Others</option>
              <option value='Prefer Not To Say'>Prefer Not To Say</option>
              </select>
              <p>{formerror.gender}</p>
           </div>

           <div>
             <div>
               <input type='radio' value="Hosteler" name="residence" onChange={inputHandler}/>
               <label>Hosteler</label>
             </div>
             <div>
               <input type='radio' value="Day Scholar" name='residence' onChange={inputHandler}/>
               <label>Day Scholar</label>
             </div>
             <p>{formerror.residence}</p>
           </div>

           <div className="checkbox">
            <div className='captcha recaptcha'>
            <ReCAPTCHA
               sitekey="6Lc86JkkAAAAAPwlOuUOdxwOk-wmN2zztWdsE8UZ"
               onChange={validate_captcha}
            />
             
            </div>
          
          </div>

           <input type='submit'   onClick={alterfunction} />
           <input type="reset" />
        </form>
    </div>
  )
}

export default Form