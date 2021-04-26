import React from 'react';
import axios from 'axios';
import PersonForm from './PersonForm';
import PersonRow from './PersonRow';

class PeopleTable extends React.Component {

    state = {
        Person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        People: [],
        isAdding: false,
        isEditing: false,
        editingId: '0',
        checkedPeople: []
    }

    componentDidMount = () => {
        axios.get('/api/people/getall').then(({ data }) => {
            this.setState({ People: data });
        });
    }

    onTextChange = e => {
        const personCopy = { ...this.state.Person };
        personCopy[e.target.name] = e.target.value;
        this.setState({ Person: personCopy });
    }

    onAddClick = () => {
        this.setState({ isAdding: true });
        axios.post('/api/people/add', this.state.Person).then(() => {
            axios.get('/api/people/getAll').then(({ data }) => {
                this.setState({
                    People: data,
                    Person: { firstName: '', lastName: '', age: '' },
                    isAdding: false
                });
            });
        });
    }

    onDeleteClick = person => {
        axios.post('/api/people/Delete', person).then(() => {
            axios.get('/api/people/getAll').then(({ data }) => {
                this.setState({
                    People: data
                });
            });
        });
    }

    onEditClick = person => {
        this.setState({ Person: { firstName: person.firstName, lastName: person.lastName, age: person.age }, isEditing: true, editingId: person.id });
    }

    onCancelClick = () => {
        this.setState({ Person: { firstName: '', lastName: '', age: '' }, isEditing: false })
    }

    onUpdateClick = () => {
        this.setState({ isAdding: true })
        const person = this.state.Person;
        person.id = this.state.editingId;
        axios.post('/api/people/Update', person).then(() => {
            axios.get('/api/people/getAll').then(({ data }) => {
                this.setState({
                    People: data,
                    Person: { firstName: '', lastName: '', age: '' },
                    isAdding: false,
                    isEditing: false
                });
            });
        });
    }

    onCheckboxChange = person => {
        
        let { checkedPeople } = this.state;

        if (checkedPeople.includes(person)) {
            this.setState({ checkedPeople: checkedPeople.filter(p => p.id !== person.id) });
        }
        else {
            this.setState({ checkedPeople: [...checkedPeople, person] });
        }
    }

    checkAll = () => {
        this.setState({ checkedPeople: [...this.state.People] });
    }

    uncheckAll = () => {
        this.setState({ checkedPeople: [] })
    }

    deleteAll = () => {
        axios.post('/api/people/DeleteAll', this.state.checkedPeople).then(() => {
            axios.get('/api/people/getAll').then(({ data }) => {
                this.setState({
                    People: data
                });
            });
        });
    }

    render() {
        const { Person, People, isAdding, isEditing, checkedPeople } = this.state;
        return (
            <div className='container'>
                <PersonForm
                    Person={Person}
                    onFirstNameChange={this.onTextChange}
                    onLastNameChange={this.onTextChange}
                    onAgeChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    isAdding={isAdding}
                    isEditing={isEditing}
                    onUpdateClick={this.onUpdateClick}
                    onCancelClick={this.onCancelClick}
                />
                <table className='table table-hover table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>
                                <button className='btn btn-warning mt-2' onClick={this.deleteAll}>Delete all</button> <br />
                                <button className='btn btn-info mt-2' onClick={this.checkAll}>Check all</button> <br />
                                <button className='btn btn-info mt-2' onClick={this.uncheckAll}>Uncheck all</button>
                            </th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!!People.length && People.map(p => {
                            return <PersonRow person={p}
                                key={p.id}
                                onDeleteClick={() => this.onDeleteClick(p)}
                                onEditClick={() => this.onEditClick(p)}
                                isChecked={checkedPeople.includes(p)}
                                onCheckboxChange={() => this.onCheckboxChange(p)}
                            />
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PeopleTable;