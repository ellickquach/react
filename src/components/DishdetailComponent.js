import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    renderComments(comments) {

        const commentsList = comments.map((c) => {
            return (
                <ul className="list-unstyled">
                    <li>{c.comment}</li>
                    <li>{c.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(c.date)))}</li>
                </ul>
            );
        });

        if (comments.length === 0) 
            return (
                <div></div>
            )
        else 
            return (
                <div className="col-xs-12 col-sm-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {commentsList}
                </div>
            )
    }

    renderDish(dish) {

        if (dish != null)
            return(
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={dish.image} alt={dish.name} />
                            <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    {this.renderComments(dish.comments)}
                </div>
            );
        else
            return(
                <div></div>
            );
    }

    render() {
        return (
            <div className="container">
                {this.renderDish(this.props.dish)}
            </div>
        );
    }
}

export default Dishdetail;