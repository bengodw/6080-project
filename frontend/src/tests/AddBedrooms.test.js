import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddBedrooms from '../components/AddBedrooms';


// Tests the AddBedrooms component
describe('AddBedrooms', () => {
    it('render AddBedrooms happens properly', () => {
      const setBedrooms = jest.fn();

      render(
        <AddBedrooms bedrooms={[{ id: 1, beds: 1 }]} setBedrooms={setBedrooms}/>
      );

      expect(screen.getByRole('spinbutton', {
        name: /beds/i
      })).toBeInTheDocument();
      expect(screen.getByDisplayValue(/1/i)).toBeInTheDocument()
      expect(screen.getByRole('button', {
        name: /remove bedroom/i
      })).toBeInTheDocument();
      expect(screen.getByRole('button', {
        name: /add another bedroom/i
      })).toBeInTheDocument();
    })

    it('render AddBedrooms without bedrooms happens properly ', () => {
      const setBedrooms = jest.fn();

      render(
        <AddBedrooms bedrooms={[]} setBedrooms={setBedrooms}/>
      );

      expect(screen.queryByRole('spinbutton', {
        name: /beds/i
      })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', {
        name: /remove bedroom/i
      })).not.toBeInTheDocument();
      expect(screen.getByRole('button', {
        name: /add another bedroom/i
      })).toBeInTheDocument();
    })

    it('multiple bedrooms gives multiple inputs', () => {
      const setBedrooms = jest.fn();

      render(
        <AddBedrooms bedrooms={[{ id: 1, beds: 1 }, { id: 2, beds: 1 }]} setBedrooms={setBedrooms}/>
      );

      expect(screen.getAllByRole('spinbutton', {
        name: /beds/i
      }).length).toBe(2);
      expect(screen.getAllByRole('button', {
        name: /remove bedroom/i
      }).length).toBe(2);
      expect(screen.getByRole('button', {
        name: /add another bedroom/i
      })).toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: /add another bedroom/i }));
    })

    it('adding bedrooms calls setBedrooms', () => {
      const setBedrooms = jest.fn();

      render(
        <AddBedrooms bedrooms={[{ id: 1, beds: 1 }]} setBedrooms={setBedrooms}/>
      );

      userEvent.click(screen.getByRole('button', { name: /add another bedroom/i }));

      expect(setBedrooms).toHaveBeenCalledTimes(1)
    })

    it('removing bedrooms calls setBedrooms', () => {
      const setBedrooms = jest.fn();

      render(
        <AddBedrooms bedrooms={[{ id: 1, beds: 1 }]} setBedrooms={setBedrooms}/>
      );

      userEvent.click(screen.getByRole('button', { name: /remove bedroom/i }));

      expect(setBedrooms).toHaveBeenCalledTimes(1)
    })

    it('can type in other bed numbers', () => {
      const setBedrooms = jest.fn();

      render(
        <AddBedrooms bedrooms={[{ id: 1, beds: 1 }]} setBedrooms={setBedrooms}/>
      );

      userEvent.click(screen.getByRole('spinbutton', { name: /beds/i }));
      userEvent.type(screen.getByRole('spinbutton', { name: /beds/i }), '2');

      screen.logTestingPlaygroundURL()
      screen.debug()

      // expect(screen.getByDisplayValue(/2/i)).toBeInTheDocument

    })

  });