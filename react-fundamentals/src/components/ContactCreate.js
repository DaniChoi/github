import React from 'react';

class ContactCreate extends React.Component{
    constructor(props){
        super(props)
            this.state = {
                name: '',
                phone: ''
            };
    }


    handleChange = (e) => {
        let nextState = {}; //빈 객체를 만들어준다
        nextState[e.target.name] = e.target.value; //e.target.name은 input에 name을 나타냄
        //만약 name이 수정되면 {name: 다은} phone이 수정되면 {phone: 1234} 이런 객체가 만들어지게됨
        this.setState(nextState)
        console.log(e.target)
    }

    handleClick = () => {
        const contact  = {
            name: this.state.name,
            phone: this.state.phone
        };

        this.props.onCreate(contact);

        this.setState({
            name: '',
            phone: ''
        });

        this.nameInput.focus();
    }

    handleKeyPress = (e) => {
        if(e.charCode ===13) {
            this.handleClick();
        }
    }
    render() {
        return (
            <div>
                <h2>Create Contact</h2>
                <p>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value = {this.state.name}
                        onChange ={this.handleChange}
                        ref={(ref) => { this.nameInput = ref }}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="phone"
                        value = {this.state.phone}
                        onChange ={this.handleChange}
                        onKeyPress = {this.handleKeyPress}
                    />
                </p>
                <button onClick={this.handleClick}>Create</button>
            </div>
        )
    }
}

ContactCreate.defaultProps = {
    onCreate: () => { console.error('onCreate not defined')}
}
export default ContactCreate;
