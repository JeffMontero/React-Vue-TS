import { Add } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";



export interface ButtomInterface {}

const Buttom: React.FC<ButtomInterface> = () => {

  return (
    <div>
      <Button  color="primary" aria-label="Añadir" component="label"  >
          NUEVO<Add />
      </Button>
    </div>  
  );
};

export default Buttom;