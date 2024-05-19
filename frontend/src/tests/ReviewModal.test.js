import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewModal from '../components/ReviewModal';


// Tests the ReviewModal component
describe('ReviewModal', () => {
  it('test that open modal button exists', () => {
    const setReviewsChanged = jest.fn();

    render(
      <ReviewModal
        token='0'
        listingId='0'
        email='email@email.com'
        bookingId='0'
        setReviewsChanged={setReviewsChanged}
      />
    );

    expect(screen.getByRole('button', { name: /leave review/i })).toBeInTheDocument();

  })

  it('click open modal button and check that modal renders', () => {
    const setReviewsChanged = jest.fn();

    render(
      <ReviewModal
        token='0'
        listingId='0'
        email='email@email.com'
        bookingId='0'
        setReviewsChanged={setReviewsChanged}
      />
    );

    userEvent.click(screen.getByRole('button', { name: /leave review/i }));
    expect(screen.getByRole('textbox', {
      name: /review/i
    })).toBeInTheDocument();
    expect(screen.getByRole('radio', {
      name: /1 star/i
    })).toBeInTheDocument();
    expect(screen.getByRole('radio', {
      name: /2 stars/i
    })).toBeInTheDocument();
    expect(screen.getByRole('radio', {
      name: /3 stars/i
    })).toBeInTheDocument();
    expect(screen.getByRole('radio', {
      name: /4 stars/i
    })).toBeInTheDocument();
    expect(screen.getByRole('radio', {
      name: /5 stars/i
    })).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /submit review/i
    })).toBeInTheDocument();
  })

  it('check that closing modal by submitting works', () => {
    const setReviewsChanged = jest.fn();

    render(
      <ReviewModal
        token='0'
        listingId='0'
        email='email@email.com'
        bookingId='0'
        setReviewsChanged={setReviewsChanged}
      />
    );
    userEvent.click(screen.getByRole('button', { name: /leave review/i }));
    expect(screen.getByRole('textbox', {
      name: /review/i
    })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /submit review/i }));
    expect(screen.queryByRole('textbox', {
      name: /review/i
    })).not.toBeInTheDocument();

  })

  it('check that review textbox works', () => {
    const setReviewsChanged = jest.fn();

    render(
      <ReviewModal
        token='0'
        listingId='0'
        email='email@email.com'
        bookingId='0'
        setReviewsChanged={setReviewsChanged}
      />
    );
    userEvent.click(screen.getByRole('button', { name: /leave review/i }));
    userEvent.type(screen.getByRole('textbox', {
      name: /review/i
    }), 'i think this place is cool')
    expect()
    expect(screen.getByText('i think this place is cool')).toBeInTheDocument();

  })

});