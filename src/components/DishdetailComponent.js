import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
            Button, Modal, ModalHeader, ModalBody, Row, Label } from 'reactstrap';

import { Link } from 'react-router-dom';

import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

function RenderComments({comments, addComment, dishId}) {

        const commentsList = comments.map((c) => {
            return (
                <ul key={c.id} className="list-unstyled">
                    <li>{c.comment}</li>
                    <li>-- {c.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(c.date)))}</li>
                </ul>
            );
        });

        if (comments.length === 0) 
            return (
                <div></div>
            )
        else 
            return (
                <React.Fragment>
                    {commentsList}
                    <CommentForm dishId={dishId} addComment={addComment} />
                </React.Fragment>
            )
}

function RenderDish({dish}) {

        if (dish != null)
            return(
                    <div className="col-xs-12 col-sm-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={dish.image} alt={dish.name} />
                            <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
            );
        else
            return(
                <div></div>
            );
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        }
        this.modalToggle = this.modalToggle.bind(this);
    }

    modalToggle() {
        this.setState({modalOpen: !this.state.modalOpen});
    }

    handleSubmit(values) {
       this.modalToggle();
       this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return(
            <React.Fragment>
            <Button outline onClick={this.modalToggle}>
                <span className="fa fa-pencil fa-lg"></span> Submit Comments
            </Button>
            <Modal isOpen={this.state.modalOpen} toggle={this.modalToggle}>
            <ModalHeader toggle={this.modalToggle}>
                Submit Comment
            </ModalHeader>
            <ModalBody>
                <LocalForm className="m-3" onSubmit={(values) => this.handleSubmit(values)}>
                        <Row>
                            <Label htmlFor="rating">Rating</Label>
                        </Row>
                        <Row className="form-group">
                            <Control.select model=".rating" name="rating" defaultValue="1" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </Row>
                        <Row>
                            <Label htmlFor="author">Your Name</Label>
                        </Row>
                        <Row className="form-group">
                                    <Control.text model=".author" id="author" name="author" placeholder="Your Name" 
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                            />
                                    <Errors 
                                        className="text-danger" 
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'This field is required.',
                                            minLength: 'Must be greater than 2 characters.',
                                            maxLength: 'Must be 15 characters or less.'
                                        }}
                                        />
                        </Row>
                        <Row>
                            <Label htmlFor="comment">Comment</Label>
                        </Row>
                        <Row className="form-group">
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" />
                        </Row>
                        <Row className="form-group">
                                    <Button type="submit" color="primary"> Submit </Button>
                        </Row>
                </LocalForm>
            </ModalBody>
            </Modal>
            </React.Fragment>
        );
    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                        <RenderDish dish={props.dish} />
                        <div className="col-xs-12 col-sm-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <RenderComments comments={props.comments} 
                                addComment={props.addComment} 
                                dishId={props.dish.id}
                                />
                        </div>
                </div>
            </div>
        )
    else
        return (
            <div></div>
        )
}


export default DishDetail;