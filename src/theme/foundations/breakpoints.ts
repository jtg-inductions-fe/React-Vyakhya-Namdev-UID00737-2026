import { BreakpointsOptions } from '@mui/material/styles';

import { BREAKPOINTS } from '@constant';

/**
 * Responsive breakpoint configuration for the application.
 */
export const breakpoints: BreakpointsOptions = {
    values: {
        xs: BREAKPOINTS.XS,
        sm: BREAKPOINTS.SM,
        md: BREAKPOINTS.MD,
        lg: BREAKPOINTS.LG,
        xl: BREAKPOINTS.XL,
    },
};
