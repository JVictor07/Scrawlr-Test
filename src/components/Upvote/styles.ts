import { tv } from 'tailwind-variants';

export const buttonStyles = tv({
  base: 'flex items-center justify-center min-w-8 h-8 rounded-md bg-[#F4F6F8] text-white text-[#343A40] transform transition-all duration-200 hover:scale-110 cursor-pointer',
  variants: {
    active: {
      true: 'bg-[#E5E8FD] text-[#253CF2]',
    },
  }
});

