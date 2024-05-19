import { render, screen } from '@testing-library/react';
import MyRating from '../components/Rating';
import Rating from '@mui/material/Rating';


// Tests for the IconText component
describe('Rating', () => {
  // Render a rating with mock reviews and see if score/numreviews is correct
  it('renders rating component correctly with mock reviews', () => {
    const mockReviews = [
      {name: 'Mike', score: 4, comment: 'Nice!'},
      {name: 'Walter', score: 3, comment: 'Okay!'},
      {name: 'Jesse', score: 2, comment: 'Meh!'},
    ]
    const averageScore = 3;

    render(<MyRating reviews={mockReviews} />);

    // Check if the number of reviews is displayed correctly
    const numReviews = screen.getByText(mockReviews.length + ' reviews');
    expect(numReviews).toBeInTheDocument();

    // Check for correct number of full and empty stars
    const stars = screen.getAllByTestId('StarIcon');
    const emptyStars = screen.getAllByTestId('StarBorderIcon');

    expect(stars.length).toBe(averageScore);
    expect(emptyStars.length).toBe(5 - averageScore);
  });

  // Render a rating with 1 review and
  // Check it says '1 review' instead of '1 reviews'
  it('Handles review pluralization', () => {
    const mockReviews = [
      {name: 'Mike', score: 4, comment: 'Nice!'}
    ]
    const averageScore = 4;

    render(<MyRating reviews={mockReviews} />);

    // Check if the number of reviews is displayed correctly
    const numReviews = screen.getByText(mockReviews.length + ' review');
    expect(numReviews).toBeInTheDocument();

    // Check for correct number of full and empty stars
    const stars = screen.getAllByTestId('StarIcon');
    const emptyStars = screen.getAllByTestId('StarBorderIcon');

    expect(stars.length).toBe(averageScore);
    expect(emptyStars.length).toBe(5 - averageScore);
  });

  // Render a rating with non-integer average score
  it('renders rating component correctly with non-integer average score', () => {
    const mockReviews = [
      {name: 'Mike', score: 4, comment: 'Nice!'},
      {name: 'Walter', score: 2, comment: 'Okay!'},
      {name: 'Jesse', score: 1, comment: 'Meh!'},
    ] // These scores average to 2.333...

    const averageScoreRounded = 2;

    render(<MyRating reviews={mockReviews} />);

    // Check if the number of reviews is displayed correctly
    const numReviews = screen.getByText(mockReviews.length + ' reviews');
    expect(numReviews).toBeInTheDocument();

    // Check for correct number of full and empty stars
    const stars = screen.getAllByTestId('StarIcon');
    const emptyStars = screen.getAllByTestId('StarBorderIcon');

    expect(stars.length).toBe(averageScoreRounded);
    expect(emptyStars.length).toBe(5 - averageScoreRounded);
  });

});
