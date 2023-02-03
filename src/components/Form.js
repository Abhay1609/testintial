import React, {useState,useEffect} from 'react';
import "./Form.css";

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
        const regex_roll=/^[2][12][0][0][2][7][01]([0-9]){6}$/;
        const regex_student=/^[2][12]([0-9]){5,6}$/;
        const regex_email=/^([a-z]){3,15}([0-9]){7,10}@akgec.ac.in$/;
        
        //VALIDATING NAME
        if(regex_name.test(formvalues.full_name.trim())){
          formvalues.full_name=formvalues.full_name.trim();
          errors.full_name="";
        }
        else{
          setnoerror(false);
          errors.full_name="error in name";
          return errors;
        }

        //VALIDATING STUDENTNO
        if(regex_student.test(formvalues.student_no.trim())){
          errors.student_no="";
          formvalues.student_no=formvalues.student_no.trim();
        }
        else{
          setnoerror(false);
          errors.student_no="Invalid Student no";
          return errors;
        }

        //VALIDATING ROLLNO
        if(regex_roll.test(formvalues.roll_no.trim())){
          errors.roll_no="";
          formvalues.roll_no=formvalues.roll_no.trim();
        }
        else{
          setnoerror(false);
          errors.roll_no="Invalid roll no";
          return errors;
        }

        //VALIDATING CONTACT
        if(regex_contact.test(formvalues.mobile_number.trim())){
            errors.mobile_number="";
            formvalues.mobile_number=formvalues.mobile_number.trim();
        }
        else{
            setnoerror(false)
            errors.mobile_number="**Invalid Mobile Number";
            return errors;
        }

        //VALIDATING EMAIL
        if(regex_email.test(formvalues.email.trim())){
          errors.email="";
          formvalues.email=formvalues.email.trim();
        }
        else{
          setnoerror(false);
          errors.email="invalid email";
          return errors;
        }

        //VALIDATING BRANCH
        if(formvalues.branch==""){
          setnoerror(false);
          errors.branch="Select branch";
          return errors;
        }
        else{
          errors.branch="";
          
        }

        //VALIDATING YEAR
        if(formvalues.year==""){
          setnoerror(false);
          errors.year="Select Year";
          return errors;
        }
        else{
          errors.year="";
          
        }
  
        //VALIDATING GENDER
        if(formvalues.gender==""){
          setnoerror(false);
          errors.gender="Select gender";
          return errors;
        }
        else{
          errors.gender="";
          
        }

        //VALIDATING RESIDENCE
        if(formvalues.residence==""){
          setnoerror(false);
          errors.residence="Select residence";
          return errors;
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
            // setLoading(true);
            // axios.post("https://web-production-0189.up.railway.app/accounts/login/",{
            //     mobile_number:formvalues.mobile_number,
            //     password:formvalues.password
            // }).then((res)=>{
            //     console.log(res)
            //     profile_data.id=res.data.profile_data.id;
            //     profile_data.name=res.data.profile_data.full_name;
            //     profile_data.age=res.data.profile_data.age;
            //     profile_data.mobile_no=res.data.profile_data.mobile_number;
            //     profile_data.email=res.data.profile_data.email;
            //     console.log(profile_data);
            //     localStorage.setItem("login","active");
            //     localStorage.setItem("profile_id",profile_data.id);
            //     localStorage.setItem("profile_name",profile_data.name);
            //     setLoading(false);
            //     navigate("/home");
            // }).catch((err)=>{
            //     console.log(err);
            //     setLoading(false);
            //     setIscredentials(true);
            //     setTimeout(()=>{
            //         setIscredentials(false);
            //     },3000)
            // })
            console.log(formvalues);
        }
    },[submitcall])


  return (
    <div>
        <form onSubmit={validateform}>
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

           <input type='submit'/>
        </form>
    </div>
  )
}

export default Form