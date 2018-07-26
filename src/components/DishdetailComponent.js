import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderComments({comments}) {

        const commentsList = comments.map((c) => {
            return (
                <ul key={c.id} className="list-unstyled">
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

const DishDetail = (props) => {
    if (props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.dish.comments} />
                </div>
            </div>
        );
    else
        return (
            <div></div>
        )
}


export default DishDetail;