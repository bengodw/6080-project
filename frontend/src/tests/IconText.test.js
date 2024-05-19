import { render, screen, waitFor } from '@testing-library/react';
import IconText from '../components/IconText';
import PaidIcon from '@mui/icons-material/Paid';

// Tests for the IconText component
describe('IconText', () => {
  // Render an IconText component with a PaidIcon Icon prop and text prop
  it('render IconText example', () => {
    render(
      <IconText icon={PaidIcon}>
        some text!
      </IconText>
    );

    expect(screen.getByTestId('PaidIcon')).toBeInTheDocument(); // Check for icon
    expect(screen.getByText(/some text!/i)).toBeInTheDocument(); // Check for text
  })

  });
