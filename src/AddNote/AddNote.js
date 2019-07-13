import React from "react"
import "./AddNote.css"
import Context from "../context"

export default class AddNote extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			note: {
				title: {
					value: "",
					touched: false	
				},
				content: {
					value: "",
					touched: false
				}
			}
		}
	}

	getTitle = (title) => {
		this.setState({
			note : {title: title, touched: true}
		})
	}

	getContent = (content) => {
		this.setState({
			note: { content: content, touched: true}
		})
	}

    render() {
        return(
            <div className="add-note-container">
                <form>
                <div>
                    <label> Add Title:
                        <input type="text" id="title" name="title" placeholder="My To Dos" onChange={e=> this.getTitle(e.target.value)}></input>                        
                    </label>
                </div>
                <div> 
                    <label> Add Content:
                        <textarea id="content" name="content" placeholder="...buy groceries" onChange={e=> this.getContent(e.target.value)}></textarea>
                    </label>
                </div>
								<div className="button-container">
                    <button type="submit">Enter Note</button>
								</div>
                </form>

            </div>
        )
    }
}