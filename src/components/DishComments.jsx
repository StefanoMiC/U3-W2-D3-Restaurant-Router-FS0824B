import { ListGroup } from "react-bootstrap";

const DishComments = ({ selectedPasta }) => {
  return (
    <>
      <h4 className="text-center mt-4">Recensioni per {selectedPasta.name}:</h4>
      <ListGroup>
        {selectedPasta.comments.map(review => (
          <ListGroup.Item key={`review-${review.id}`}>
            <strong>{review.author}</strong> — {review.comment}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default DishComments;
