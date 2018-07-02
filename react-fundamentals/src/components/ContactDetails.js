import React from 'react';

class ContactDetails extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isEdit: false,
            name: '',
            phone: ''
        };
    }

    handleToggle = () => {
        if(!this.state.isEdit) {
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            });
        } else {
            this.handleEdit();
        }
        this.setState({
              isEdit: !this.state.isEdit
        });
        console.log(this.state.isEdit); /*setState가 끝나기 전에 console이 실행
        그래서 console에 false먼저 나옴*/
    }

    handleChange = (e) => {
        let nextState = {}; //빈 객체를 만들어준다
        nextState[e.target.name] = e.target.value; //e.target.name은 input에 name을 나타냄
        //만약 name이 수정되면 {name: 다은} phone이 수정되면 {phone: 1234} 이런 객체가 만들어지게됨
        this.setState(nextState)
        console.log(e.target)
    }

    handleEdit = () => {
        this.props.onEdit(this.state.name, this.state.phone);
    }

    handleKeyPress = (e) => {
        if(e.charCode ===13) {
            this.handleToggle();
        }
    }

    render(){

        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );

        const edit = (
            <div>
                <p>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value = {this.state.name}
                        onChange ={this.handleChange}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        name="phone"
                        placeholder="phone"
                        value = {this.state.phone}
                        onChange ={this.handleChange}
                        onKeyPress = {this.handleKeyPress}
                    />
                </p>
            </div>
        )
        const view = this.state.isEdit ? edit : details;
        const blank = (<div>Not Selected</div>);

        return(
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? view : blank }
                <p>
                    <button onClick = {this.handleToggle}>
                        {this.state.isEdit ? "OK" : "Edit"}
                    </button>
                    <button onClick = {this.props.onRemove}>Remove</button>
                </p>
            </div>
        );
    }
}

ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: ''
    },
    onRemove: () => { console.error('onRemove not defined'); },
    onEdit: () => { console.error('onEdit not defined'); }
};

export default ContactDetails;
