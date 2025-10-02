import React from 'react'
import {MoveDown, Send} from 'lucide-react'
import './styles.css'

const Contact = () => {
  return (
    <div className='containers'>
        <div className="container-1">
            <div className="content">
                <p>Get in Touch</p>
                <h1>Do you have a question, <br/> an idea, or a project you <br/> need help with? <br/> Contact Us!</h1>
            </div>
            <div className="social-links">
                <div className="row1">
                    <div>radiantsofficial.com</div>
                    <div>sparks@radiantsofficial.com</div>
                </div>
                <div className="row2">
                    <div>Instagram</div>
                    <div>Facebook</div>
                    <div>Github</div>
                </div>
            </div>
            <div className="contact-form">
                <img src="/images/contact-circle.svg" alt="" />
                <span>
                    <MoveDown />
                </span>
            </div>
        </div>
        <div className="container-2">
            <div className="inputboxes">
                <div className="row1">
                    <input type="text" placeholder="Name" />
                    <input
                        placeholder="E-mail"
                        type="text" 
                    />
                    <input placeholder="Subject" type="text" />
                </div>
                <div className="row2">
                    <div className="textarea">
                        <textarea placeholder='Message'></textarea>
                    </div>
                </div>
            </div>
            <div className="submitbtn">
                <Send />
                <h1>Submit</h1>
            </div>
        </div>
    </div>
  )
}

export default Contact