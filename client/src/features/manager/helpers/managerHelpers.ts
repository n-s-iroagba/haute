import { ManagerDto } from "../../../../../common/managerType";

export const sortManagers = (managers: ManagerDto[]): ManagerDto[] => {
  if (!Array.isArray(managers)) {
     return []
  }
  return managers.slice().sort((a, b) => a.minimumInvestmentAmount  as number- (b.minimumInvestmentAmount  as number));
};

export const findManagerById = (managersArray:ManagerDto[], idToFind:number) => {
  return managersArray.find((manager) => manager.id === idToFind)||null;
};


