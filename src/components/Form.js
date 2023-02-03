import React, {useState,useEffect} from 'react';
import "./Form.css";

const Form = () => {

    const initialvalues={
        name:"",
        roll:"",
        contact:"",
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
        const regex_email=/^([a-z]){3,15}([0-9]){7,10}@akgec.ac.in$/;
        
        //VALIDATING NAME
        if(regex_name.test(formvalues.name.trim())){
          formvalues.name=formvalues.name.trim();
          errors.name="";
        }
        else{
          setnoerror(false);
          errors.name="error in name";
        }

        //VALIDATING ROLLNO
        if(regex_roll.test(formvalues.roll.trim())){
          errors.roll="";
          formvalues.roll=formvalues.roll.trim();
        }
        else{
          setnoerror(false);
          errors.roll="Invalid roll no"
        }

        //VALIDATING CONTACT
        if(regex_contact.test(formvalues.contact.trim())){
            errors.contact="";
            formvalues.contact=formvalues.contact.trim();
        }
        else{
            setnoerror(false)
            errors.contact="**Invalid Mobile Number";
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
              <input type="text" placeholder="Name" name="name" value={formvalues.name} onChange={inputHandler}/>
              <p>{formerror.name}</p>
           </div>

           <div className='roll-sec'>
              <input type="text" placeholder="University Roll No." name='roll' value={formvalues.roll} onChange={inputHandler}/>
              <p>{formerror.roll}</p>
           </div>

           <div className='contact-sec'>
              <input type="text" placeholder="Contact No." name="contact" value={formvalues.contact} onChange={inputHandler}/>
              <p>{formerror.contact}</p>
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