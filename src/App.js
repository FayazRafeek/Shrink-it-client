import React,{useState} from 'react';
import axios from 'axios';
import './App.css';
import {AiFillCopy} from 'react-icons/ai'
import {HiExternalLink} from 'react-icons/hi'
import {IoMdClose} from 'react-icons/io'

function App() {

  const [state, setState] = useState({

    isLoading: false,
    isError: false,
    inpUrl: '',
    outUrl: ''
  })

  const formSubmit = async() => {


    setState({...state, isLoading: true, isError: false, outUrl: ''})

    try {
      const resp  = await axios.post('https://url-short-server.herokuapp.com/shorten', {url: state.inpUrl});
  
      setState({...state, isLoading: false})
  
      if(resp.status === 200){
  
        if(resp.data.status){
          setState({
            ...state,
            outUrl: resp.data.url
          })
  
          return;
        } else alert(resp.data.message)
      } else alert('An error occurred')

    } catch(err) {
      setState({...state, isLoading: false, isError: true})
      alert(err)
    }

  }

  const copyUrlToClip = () => {

    //Copy to clipboard
    const el = document.createElement('textarea');
    el.value = state.outUrl;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

  }

  const openLink = () => {
    window.open(state.outUrl, '_blank');
  }

  const closeSearch = () => {
  
    setState({
      ...state,
      isLoading: false,
      isError: false,
      inpUrl: '',
      outUrl: ''
    })
  }

  return (
    <div className="App">

      <div className="container">

        <div className="bg-stick"></div>

        <div className="parent">

          <div className="main-container">

            <div className="form stack">
              <p>Enter original url : </p>
              <div className="inp">
                <input type="text" value={state.inpUrl} placeholder="ex: http://www.google.com" onChange={(e) => setState({...state, inpUrl : e.target.value})} name="" id="" />
              
                {
                  state.inpUrl.length > 0 ? 
                  <div className="close-icon" onClick={(e) => closeSearch()}>
                  <IoMdClose />
                </div> : ''
                }
                
              
              </div>
              <button onClick={(e) => formSubmit()}>GENERATE</button> 
            </div>

            {
              state.isLoading
              ?
              <div className="loader">
              <div class="lds-facebook"><div></div><div></div><div></div></div>
            </div> : ''
            }

            {state.outUrl !== ''? 
                 <div className="output stack">


                 <div className="divider"></div>
                 
                 <p>Generated url : </p>
   
                 
                 <div className="output-url">
                   {state.outUrl}
                 
                   <div className="icons">
                     <div className="icon" onClick={(e) => copyUrlToClip()}><AiFillCopy /></div>
                     <div className="icon" onClick={(e) => openLink()}><HiExternalLink /></div>
                     
                   </div>
                 </div>

                 <div className="output-action-btns">
                    <div onClick={(e) => copyUrlToClip()}>Copy <AiFillCopy /></div>
                    <div onClick={(e) => openLink()}>Open Link <HiExternalLink /></div>
                 </div>
                 
               </div> : ''
            }
           


           
         
         
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
