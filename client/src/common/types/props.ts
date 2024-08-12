import React from "react";
import { Manager } from "../../../../common/managerType";
export interface ManagerCardProps extends Manager{
  image:  any;
    button: React.ReactNode,
    deleteButton?: React.ReactNode;
    
  }
  