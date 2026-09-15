import PriceCheckModeWithSelectedCustomerWithoutOrderLinesWrapper from './PriceCheckModeWithSelectedCustomerWithoutOrderLinesWrapper';
import PriceCheckModeWithSelectedCustomerAndOrderLinesWrapper from './PriceCheckModeWithSelectedCustomerAndOrderLinesWrapper';
import { PriceCheckModeWithoutCustomer } from './PriceCheckModeWithoutCustomer';

interface Customer {
  id: string;
  name: string;
  customerNumber: string;
  type: 'Proff' | 'Privat';
  discountRate?: number;
  category?: string;
}

interface Project {
  id: string;
  nr: string;
  ekstNr: string;
  navn: string;
  adresse: string;
  postnr: string;
  utlopsdato: string;
}

interface OrderGroupData {
  id: string;
  type: 'handterminal' | 'order';
  orderNumber?: string;
  orderDate: string;
  customerName?: string;
  projectName?: string;
  phoneNumber?: string;
  total: number;
  itemCount: number;
  label?: { text: string; borderColor: string };
  showRemoveButton?: boolean;
  items: any[];
}

interface PriceCheckModeProps {
  onClose: () => void;
  hasOrderItems?: boolean;
  selectedCustomer?: Customer | null;
  selectedProject?: Project | null;
  onEditCustomer?: () => void;
  onRemoveCustomer?: () => void;
  orderGroups?: OrderGroupData[];
  addedItems?: any[];
  currentUser?: string;
  onUserChange?: (username: string) => void;
}

export function PriceCheckMode({ 
  onClose, 
  hasOrderItems = false, 
  selectedCustomer, 
  selectedProject,
  onEditCustomer,
  onRemoveCustomer,
  orderGroups,
  addedItems,
  currentUser,
  onUserChange
}: PriceCheckModeProps) {
  // If no customer is selected, show the state without customer (but may still have order items)
  if (!selectedCustomer) {
    return <PriceCheckModeWithoutCustomer 
      onClose={onClose} 
      currentUser={currentUser} 
      onUserChange={onUserChange}
      orderGroups={orderGroups}
      addedItems={addedItems}
    />;
  }
  
  // If customer is selected and there are order items
  if (hasOrderItems) {
    return <PriceCheckModeWithSelectedCustomerAndOrderLinesWrapper 
      onClose={onClose}
      selectedCustomer={selectedCustomer}
      selectedProject={selectedProject}
      onEditCustomer={onEditCustomer}
      onRemoveCustomer={onRemoveCustomer}
      orderGroups={orderGroups}
      addedItems={addedItems}
      currentUser={currentUser}
      onUserChange={onUserChange}
    />;
  }
  
  // If customer is selected but no order items
  return <PriceCheckModeWithSelectedCustomerWithoutOrderLinesWrapper 
    onClose={onClose}
    selectedCustomer={selectedCustomer}
    selectedProject={selectedProject}
    onEditCustomer={onEditCustomer}
    onRemoveCustomer={onRemoveCustomer}
    currentUser={currentUser}
    onUserChange={onUserChange}
  />;
}
