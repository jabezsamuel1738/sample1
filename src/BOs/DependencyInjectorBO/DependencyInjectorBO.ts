import AppShellServices from '../../Services/AppShellService/AppShellServices';
import CycleCountServices from '../../Services/CycleCountService/CycleCountService';
import InventoryServices from '../../Services/InventoryServices/InventoryServices';

export interface DependencyInjectorBO {
  BaseURL: string;
  InventoryServices: InventoryServices;
  AppShellServices: AppShellServices;
  CycleCountServices: CycleCountServices;
}
