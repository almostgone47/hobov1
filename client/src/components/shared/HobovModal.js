import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import { useDispatch } from 'react-redux';

import { resetErrors } from '../../store/actions';

const HobovModal = ({title = "Modal Window", children, openBtn, onSubmit }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(resetErrors());
    }, [isOpen]);

    return (
        <>  
            {!openBtn &&
                <button
                    onClick={() => setIsOpen(true)}
                    className="btn btn-success">Open</button>
            }
            {openBtn && 
                <div onClick={() => setIsOpen(true)}>
                    {openBtn}
                </div>
            }   
            <Modal 
                focusTrapped={false}
                open={isOpen}
                onClose={() => setIsOpen(false)} 
                classNames={{ modal: 'hobov-modal' }}>
                <h4 className='modal-title title'>{title}</h4>
                <div className='modal-body'>
                    {children}
                </div>
                <div className='modal-footer'>
                    <button 
                        onClick={() => onSubmit(() => setIsOpen(false))}
                        type='button' 
                        className='btn btn-main'>Confirm</button>
                    <button 
                        onClick={() => setIsOpen(false)}
                        type='button' 
                        className='btn btn-alert'>Cancel</button>
                </div>
            </Modal>
        </>
    );
};

export default HobovModal;
