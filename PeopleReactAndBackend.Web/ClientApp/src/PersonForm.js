import React from 'react';

function PersonForm({ Person, onFirstNameChange,
    onLastNameChange, onAgeChange, onAddClick, isAdding,
    isEditing, onCancelClick, onUpdateClick }) {
    return (
        <div className="row jumbotron">
            <div className="col-md-3">
                <input value={Person.firstName} onChange={onFirstNameChange} name='firstName' type="text" className="form-control" placeholder="First Name" />
                {isEditing &&
                    <input value={Person.id} name='id' type="hidden" className="form-control"/>

                }
            </div>
            <div className="col-md-3">
                <input value={Person.lastName} onChange={onLastNameChange} name='lastName' type="text" className="form-control" placeholder="Last Name" />
            </div>
            <div className="col-md-3">
                <input value={Person.age} onChange={onAgeChange} name='age' type="text" className="form-control" placeholder="Age" />
            </div>
            <div className="col-md-3">
                <button disabled={isAdding} onClick={!isEditing ? onAddClick : onUpdateClick} className='btn btn-primary btn-block'>
                    {!isEditing ? 'Add' : 'Update'}
                </button>
                {isEditing &&
                    <button onClick={onCancelClick} className='btn btn-warning btn-block'>
                        Cancel
                    </button>
                }
            </div>
        </div>
    )
}

export default PersonForm;