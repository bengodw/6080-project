import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingRequest from '../components/BookingRequest';


// Tests the BookingRequest component
describe('BookingRequest', () => {
  it('render BookingRequest happens properly', () => {
    const setRequestStatusChanged = jest.fn();

    render(
      <BookingRequest
        key='0'
        id='0'
        owner='ben'
        dateRange={{
            start: '2023-11-23T13:00:00.000Z',
            end: '2023-11-26T13:00:00.000Z'
        }}
        totalPrice='40'
        listingId='0'
        token={null}
        setRequestStatusChanged={setRequestStatusChanged}
      />
    );

    expect(screen.getByRole('button', {
      name: /accept/i
    })).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /decline/i
    })).toBeInTheDocument();
    expect(screen.getByText(
      /2023/i
    )).toBeInTheDocument();
    expect(screen.getByText(
      /11/i
    )).toBeInTheDocument();
    expect(screen.getByText(
      /26/i
    )).toBeInTheDocument();
    expect(screen.getByText(
      /ben/i
    )).toBeInTheDocument();
  })

  it('check that accept works properly', () => {
    const setRequestStatusChanged = jest.fn();

    render(
      <BookingRequest
        key='0'
        id='0'
        owner='ben'
        dateRange={{
            start: '2023-11-23T13:00:00.000Z',
            end: '2023-11-26T13:00:00.000Z'
        }}
        totalPrice='40'
        listingId='0'
        token={null}
        setRequestStatusChanged={setRequestStatusChanged}
      />
    );

    userEvent.click(screen.getByRole('button', { name: /accept/i }));

    expect(setRequestStatusChanged).toHaveBeenCalledTimes(1)

  })

  it('check that decline works properly', () => {
    const setRequestStatusChanged = jest.fn();

    render(
      <BookingRequest
        key='0'
        id='0'
        owner='ben'
        dateRange={{
            start: '2023-11-23T13:00:00.000Z',
            end: '2023-11-26T13:00:00.000Z'
        }}
        totalPrice='40'
        listingId='0'
        token={null}
        setRequestStatusChanged={setRequestStatusChanged}
      />
    );

    userEvent.click(screen.getByRole('button', { name: /decline/i }));

    expect(setRequestStatusChanged).toHaveBeenCalledTimes(1)

  })

});