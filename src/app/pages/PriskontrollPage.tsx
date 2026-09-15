import React from 'react';
import { useNavigate } from 'react-router';
import { usePOS } from '../contexts/POSContext';
import { useModalParams } from '../hooks/useModalParams';
import { PriceCheckMode } from '../components/PriceCheckMode';

export default function PriskontrollPage() {
  const navigate = useNavigate();
  const { openModal } = useModalParams();

  const {
    selectedCustomer,
    selectedProject,
    handleRemoveCustomer,
    orderGroups,
    addedItems,
    currentUser,
    setCurrentUser,
  } = usePOS();

  const hasOrderItems = addedItems.length > 0 || orderGroups.length > 0;

  return (
    <div className="flex-1 min-h-0 w-full">
      <PriceCheckMode
        onClose={() => navigate('/salg')}
        hasOrderItems={hasOrderItems}
        selectedCustomer={selectedCustomer}
        selectedProject={selectedProject}
        onEditCustomer={() => openModal('customer')}
        onRemoveCustomer={handleRemoveCustomer}
        orderGroups={orderGroups}
        addedItems={addedItems}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
      />
    </div>
  );
}