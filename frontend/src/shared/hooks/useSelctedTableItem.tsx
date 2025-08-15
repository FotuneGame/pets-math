import { useState } from "react";



export const useSelectedTableItem = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selected, setSelected] = useState<any | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, item: any) => {
    setAnchorEl(event.currentTarget);
    setSelected(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelected(null);
  };

  return {
    anchorEl,
    selected,
    handleMenuOpen,
    handleMenuClose,
  };
};