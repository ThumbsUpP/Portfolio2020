import { compose, branch, withProps, renderComponent } from 'recompose';
import ScrollSlider from './ScrollSlider';
import MobileSlider from './MobileSlider';
import isMobileHOC from '@/HOC/isMobileHOC';
import data from './data.json';

export default compose(
  withProps(() => {
    const { nodes, title } = data;
    return { nodes, title };
  }),
  isMobileHOC,
  branch(({ isMobile }) => isMobile, renderComponent(MobileSlider))
)(ScrollSlider);
