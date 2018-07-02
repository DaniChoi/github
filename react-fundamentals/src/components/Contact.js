import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';

import update from 'react-addons-update';


class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            keyword: '',
            contactData: [{
                name: 'Abet',
                phone: '010-0000-0001'
            }, {
                name: 'Betty',
                phone: '010-0000-0002'
            }, {
                name: 'Charlie',
                phone: '010-0000-0003'
            }, {
                name: 'David',
                phone: '010-0000-0004'
            }]
        };
    }


    ComponentWillMount() {
        const contactData = localStorage.contactData;

        if(contactData) {
            this.setState({
                contactData: JSON.parse(contactData)
            })
        }
    }

    ComponentDidUpdate(prevProps, prevState) {
        if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }

    handleChange = (e) => {
        this.setState({
          keyword: e.target.value //onChange가 발생할때 type한 value값을 의미.
          //input에 있는 value랑은 다름
        });
        console.log(e.target.value)
        console.log(this.state.keyword) /* this.setState가 실행되기 전에 this.state.keyword가 보여진다. 그래서
        e.target.value가 this.state.keyword랑 동일하게 나오지 않는 것 but 실제로 결과적으로
        e.target.value == this.state.keyword */
    }

    handleClick = (key) => {
        this.setState({
          selectedKey: key
        });

        console.log(key, 'is selected');
    }

    handleCreate = (contact) => {
        this.setState({
            contactData: update(this.state.contactData, {$push: [contact]})
        });
    }

    handleRemove = () => {
        if(this.state.selectedKey < 0) {
            return;
        }

        this.setState({
             contactData: update(this.state.contactData,
                 {$splice: [[this.state.selectedKey,1]]}
             ),
             selectedKey: -1
         });
    }

    handleEdit = (name, phone) => { //name, phone을 수정할 수 있도록 할 것
        this.setState({
            contactData: update(this.state.contactData,
                {
                    [this.state.selectedKey]: {
                        name: { $set: name}, //parameter로 받은 name을 새 name으로 수정
                        phone: { $set: phone} //
                    }
                }
            )
        });
    }


    render() {
        const mapToComponents = (data) => {
            data.sort();
            data = data.filter(
              (contact) => {
                return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
              } //if onChange가 활성화 안되면 keyword: ''이기 때문에 모든 값에 대해서 true
              //공집합은 모든 집합의 부분집합? 인것 처럼 그런 logic인 듯
            )

            return data.map((contact, i) => {
                return (<ContactInfo
                            contact={contact}
                            key={i}
                            onClick = {() => this.handleClick(i)}/>);
            });
        };

        return (
            <div>
                <h1>Contacts</h1>
                <input
                   name = "keyword"
                   placeholder = "Search"
                   value = {this.state.keyword} //input의 value에 keyword 호출
                   onChange = {this.handleChange}
                 />
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetails
                    isSelected = {this.state.selectedKey !== -1}
                    contact = {this.state.contactData[this.state.selectedKey]}
                    onRemove = {this.handleRemove}
                    onEdit = {this.handleEdit}
                />
                <ContactCreate
                    onCreate = {this.handleCreate} />
            </div>
        );

    }
}

export default Contact;
