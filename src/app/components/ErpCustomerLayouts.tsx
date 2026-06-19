import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface Customer {
  id: string;
  name: string;
  customerNumber: string;
  type: 'Proff' | 'Privat';
  discountRate?: number;
  category?: string;
  mobile?: string;
  email?: string;
  street?: string;
  postalCode?: string;
  city?: string;
  creditLimit?: string;
  availableCredit?: string;
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

interface ErpLayoutProps {
  selectedCustomer: Customer;
  selectedProject: Project | null;
  customerSearch: string;
  projectSearch: string;
  onCustomerSearchChange: (value: string) => void;
  onProjectSearchChange: (value: string) => void;
}

// Nexstep ERP Layout - Default standard layout
export function NexstepLayout({ selectedCustomer, selectedProject, customerSearch, projectSearch, onCustomerSearchChange, onProjectSearchChange }: ErpLayoutProps) {
  const { t } = useLanguage();
  
  const contactPersons = [
    'Aragorn Elessar',
    'Éowyn Rohan',
    'Gandalf Greyhame',
    'Arwen Evenstar',
    'Legolas Greenleaf'
  ];
  
  return (
    <div className="flex flex-col gap-4 font-['Montserrat']">
      <div className="text-[var(--text-sm)] text-[color:var(--muted-foreground)]">
        Nexstep ERP: Standard customer/project fields
      </div>
      
      {/* Customer Selection */}
      <div className="flex flex-col gap-2">
        <label className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[color:var(--foreground)]">
          {t('customer')}
        </label>
        <input
          type="text"
          value={customerSearch}
          onChange={(e) => onCustomerSearchChange(e.target.value)}
          className="w-full px-3 py-2 bg-[color:var(--input-background)] border border-[color:var(--border)] rounded-[var(--radius)] text-[var(--text-base)] text-[color:var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)]"
          placeholder="Search customer..."
        />
      </div>

      {/* Customer Details */}
      {selectedCustomer && (
        <div className="bg-[color:var(--secondary)] p-4 rounded-[var(--radius)] border border-[color:var(--border)]">
          <div className="grid grid-cols-2 gap-3 text-[var(--text-sm)]">
            <div>
              <span className="text-[color:var(--muted-foreground)]">Customer Number:</span>
              <span className="ml-2 font-[var(--font-weight-semibold)] text-[color:var(--foreground)]">{selectedCustomer.customerNumber}</span>
            </div>
            <div>
              <span className="text-[color:var(--muted-foreground)]">Type:</span>
              <span className="ml-2 font-[var(--font-weight-semibold)] text-[color:var(--foreground)]">{selectedCustomer.type}</span>
            </div>
            <div>
              <span className="text-[color:var(--muted-foreground)]">Discount:</span>
              <span className="ml-2 font-[var(--font-weight-semibold)] text-[color:var(--foreground)]">{selectedCustomer.discountRate}%</span>
            </div>
            <div>
              <span className="text-[color:var(--muted-foreground)]">Category:</span>
              <span className="ml-2 font-[var(--font-weight-semibold)] text-[color:var(--foreground)]">{selectedCustomer.category}</span>
            </div>
          </div>
        </div>
      )}

      {/* Contact Person Dropdown */}
      <div className="flex flex-col gap-2">
        <label className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[color:var(--foreground)]">
          Contact Person
        </label>
        <select 
          className="w-full px-3 py-2 bg-[color:var(--popover)] border border-[color:var(--border)] rounded-[var(--radius)] text-[var(--text-base)] text-[color:var(--popover-foreground)] focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)] cursor-pointer appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTEgMSIgc3Ryb2tlPSIjNkI2QjcyIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-[length:12px_8px] bg-[position:right_12px_center] bg-no-repeat pr-10"
        >
          <option value="">Select contact person...</option>
          {contactPersons.map((person) => (
            <option key={person} value={person}>
              {person}
            </option>
          ))}
        </select>
      </div>

      {/* Project Selection */}
      <div className="flex flex-col gap-2">
        <label className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[color:var(--foreground)]">
          {t('project')} (Optional)
        </label>
        <input
          type="text"
          value={projectSearch}
          onChange={(e) => onProjectSearchChange(e.target.value)}
          className="w-full px-3 py-2 bg-[color:var(--input-background)] border border-[color:var(--border)] rounded-[var(--radius)] text-[var(--text-base)] text-[color:var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)]"
          placeholder="Search project..."
        />
      </div>

      {/* Project Details */}
      {selectedProject && (
        <div className="bg-[color:var(--secondary)] p-4 rounded-[var(--radius)] border border-[color:var(--border)]">
          <div className="text-[var(--text-sm)]">
            <div className="font-[var(--font-weight-semibold)] text-[color:var(--foreground)] mb-2">{selectedProject.navn}</div>
            <div className="text-[color:var(--muted-foreground)]">{selectedProject.adresse}, {selectedProject.postnr}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Trygg2000 ERP Layout - Enhanced with additional fields
export function Trygg2000Layout({ selectedCustomer, selectedProject, customerSearch, projectSearch, onCustomerSearchChange, onProjectSearchChange }: ErpLayoutProps) {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col gap-4 font-['Montserrat']">
      <div className="text-[13px] text-[#6b6b72]">
        Trygg2000 ERP: Enhanced customer data with extended fields
      </div>
      
      {/* Customer Selection with dropdown */}
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-semibold text-[#090914]">
          Kundenummer / Kundenavn
        </label>
        <select className="w-full px-3 py-2 border border-[#d5d5d7] rounded-[5px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary">
          <option>{selectedCustomer.customerNumber} - {selectedCustomer.name}</option>
        </select>
      </div>

      {/* Extended Customer Details */}
      {selectedCustomer && (
        <div className="bg-gray-50 p-4 rounded-[5px] border border-[#d5d5d7] space-y-3">
          <div className="grid grid-cols-2 gap-3 text-[13px]">
            <div>
              <span className="text-[#6b6b72]">Telefon:</span>
              <span className="ml-2 font-semibold text-[#090914]">{selectedCustomer.mobile || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[#6b6b72]">E-post:</span>
              <span className="ml-2 font-semibold text-[#090914]">{selectedCustomer.email || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[#6b6b72]">Kredittgrense:</span>
              <span className="ml-2 font-semibold text-[#090914]">{selectedCustomer.creditLimit || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[#6b6b72]">Tilgjengelig kreditt:</span>
              <span className="ml-2 font-semibold text-[#090914]">{selectedCustomer.availableCredit || 'N/A'}</span>
            </div>
          </div>
          <div className="text-[13px]">
            <span className="text-[#6b6b72]">Adresse:</span>
            <span className="ml-2 text-[#090914]">{selectedCustomer.street}, {selectedCustomer.postalCode} {selectedCustomer.city}</span>
          </div>
        </div>
      )}

      {/* Project with reference fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#090914]">
            Prosjekt
          </label>
          <select className="w-full px-3 py-2 border border-[#d5d5d7] rounded-[5px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">Velg prosjekt...</option>
            {selectedProject && <option>{selectedProject.nr} - {selectedProject.navn}</option>}
          </select>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#090914]">
            Referanse
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-[#d5d5d7] rounded-[5px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Kundens referanse..."
          />
        </div>
      </div>
    </div>
  );
}

// Aspect4 ERP Layout - Simplified with focus on projects
export function Aspect4Layout({ selectedCustomer, selectedProject, customerSearch, projectSearch, onCustomerSearchChange, onProjectSearchChange }: ErpLayoutProps) {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col gap-4 font-['Montserrat']">
      <div className="text-[13px] text-[#6b6b72]">
        Aspect4 ERP: Simplified layout focused on project selection
      </div>
      
      {/* Compact Customer Info */}
      <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-[5px] border border-[#d5d5d7]">
        <div className="flex-1">
          <div className="text-[14px] font-semibold text-[#090914]">{selectedCustomer.name}</div>
          <div className="text-[12px] text-[#6b6b72]">{selectedCustomer.customerNumber} • {selectedCustomer.type}</div>
        </div>
        <button className="text-[12px] text-primary font-semibold hover:underline">
          Endre kunde
        </button>
      </div>

      {/* Project-focused layout */}
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-semibold text-[#090914]">
          Velg prosjekt *
        </label>
        <select className="w-full px-3 py-2 border border-[#d5d5d7] rounded-[5px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="">-- Velg prosjekt --</option>
          {selectedProject && <option>{selectedProject.nr} - {selectedProject.navn}</option>}
        </select>
      </div>

      {selectedProject && (
        <div className="bg-blue-50 p-4 rounded-[5px] border border-blue-200">
          <div className="text-[13px]">
            <div className="font-semibold text-[#090914] mb-1">{selectedProject.navn}</div>
            <div className="text-[#6b6b72]">Prosjektnr: {selectedProject.nr}</div>
            <div className="text-[#6b6b72]">Utløpsdato: {selectedProject.utlopsdato}</div>
          </div>
        </div>
      )}

      {/* Quick Notes */}
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-semibold text-[#090914]">
          Notater
        </label>
        <textarea
          className="w-full px-3 py-2 border border-[#d5d5d7] rounded-[5px] text-[14px] resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          rows={3}
          placeholder="Legg til notater til ordren..."
        />
      </div>
    </div>
  );
}

// AX (Microsoft Dynamics AX) Layout - Extended customer info
export function AXLayout({ selectedCustomer, selectedProject, customerSearch, projectSearch, onCustomerSearchChange, onProjectSearchChange }: ErpLayoutProps) {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col gap-4 font-['Montserrat']">
      <div className="text-[13px] text-[#6b6b72]">
        Microsoft Dynamics AX: Extended customer information
      </div>
      
      {/* Customer Search with Account Group */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#090914]">
            Customer Account
          </label>
          <input
            type="text"
            value={customerSearch}
            onChange={(e) => onCustomerSearchChange(e.target.value)}
            className="w-full px-3 py-2 border border-[#d5d5d7] rounded-[5px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#090914]">
            Account Group
          </label>
          <select className="w-full px-3 py-2 border border-[#d5d5d7] rounded-[5px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary">
            <option>{selectedCustomer.type === 'Proff' ? 'Commercial' : 'Retail'}</option>
          </select>
        </div>
      </div>

      {/* Customer Info Grid */}
      {selectedCustomer && (
        <div className="bg-gray-50 p-4 rounded-[5px] border border-[#d5d5d7]">
          <div className="grid grid-cols-3 gap-x-4 gap-y-3 text-[13px]">
            <div className="col-span-2">
              <span className="text-[#6b6b72] block mb-1">Customer Name:</span>
              <span className="font-semibold text-[#090914]">{selectedCustomer.name}</span>
            </div>
            <div>
              <span className="text-[#6b6b72] block mb-1">Discount %:</span>
              <span className="font-semibold text-[#090914]">{selectedCustomer.discountRate}%</span>
            </div>
            <div>
              <span className="text-[#6b6b72] block mb-1">Phone:</span>
              <span className="text-[#090914]">{selectedCustomer.mobile || 'N/A'}</span>
            </div>
            <div className="col-span-2">
              <span className="text-[#6b6b72] block mb-1">Email:</span>
              <span className="text-[#090914]">{selectedCustomer.email || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[#6b6b72] block mb-1">Credit Limit:</span>
              <span className="text-[#090914]">{selectedCustomer.creditLimit || 'Unlimited'}</span>
            </div>
            <div>
              <span className="text-[#6b6b72] block mb-1">Available Credit:</span>
              <span className="text-green-600 font-semibold">{selectedCustomer.availableCredit || 'N/A'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Sales Order Line Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#090914]">
            Sales Order ID
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-[#d5d5d7] rounded-[5px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Auto-generated"
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#090914]">
            Delivery Date
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-[#d5d5d7] rounded-[5px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Project Reference */}
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-semibold text-[#090914]">
          Project ID
        </label>
        <input
          type="text"
          value={selectedProject?.nr || ''}
          onChange={(e) => onProjectSearchChange(e.target.value)}
          className="w-full px-3 py-2 border border-[#d5d5d7] rounded-[5px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Optional project reference..."
        />
      </div>
    </div>
  );
}

// IFS ERP Layout - Industry-specific fields
export function IFSLayout({ selectedCustomer, selectedProject, customerSearch, projectSearch, onCustomerSearchChange, onProjectSearchChange }: ErpLayoutProps) {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col gap-4 font-['Montserrat']">
      <div className="text-[13px] text-[#6b6b72]">
        IFS Applications: Industry-specific fields and workflow
      </div>
      
      {/* Customer with Site */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#090914]">
            Customer No *
          </label>
          <input
            type="text"
            value={selectedCustomer.customerNumber}
            className="w-full px-3 py-2 border border-[#d5d5d7] rounded-[5px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#090914]">
            Site *
          </label>
          <select className="w-full px-3 py-2 border border-[#d5d5d7] rounded-[5px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary">
            <option>MAIN - Hovedlager</option>
            <option>BRANCH1 - Avdeling Oslo</option>
            <option>BRANCH2 - Avdeling Bergen</option>
          </select>
        </div>
      </div>

      {/* Customer Details Card */}
      {selectedCustomer && (
        <div className="bg-gray-50 p-4 rounded-[5px] border border-[#d5d5d7]">
          <div className="text-[14px] font-semibold text-[#090914] mb-3">{selectedCustomer.name}</div>
          <div className="grid grid-cols-2 gap-3 text-[13px]">
            <div>
              <span className="text-[#6b6b72]">Category:</span>
              <span className="ml-2 text-[#090914]">{selectedCustomer.category}</span>
            </div>
            <div>
              <span className="text-[#6b6b72]">Discount Group:</span>
              <span className="ml-2 text-[#090914]">{selectedCustomer.discountRate}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Work Order / Project */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#090914]">
            Work Order No
          </label>
          <input
            type="text"
            value={selectedProject?.nr || ''}
            className="w-full px-3 py-2 border border-[#d5d5d7] rounded-[5px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Optional..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#090914]">
            Cost Center
          </label>
          <select className="w-full px-3 py-2 border border-[#d5d5d7] rounded-[5px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">-- Select --</option>
            <option>CC-001 - Administration</option>
            <option>CC-002 - Sales</option>
            <option>CC-003 - Operations</option>
          </select>
        </div>
      </div>

      {/* Contract Information */}
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-semibold text-[#090914]">
          Contract Reference
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-[#d5d5d7] rounded-[5px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter contract number if applicable..."
        />
      </div>

      {/* Delivery Terms */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#090914]">
            Delivery Terms
          </label>
          <select className="w-full px-3 py-2 border border-[#d5d5d7] rounded-[5px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary">
            <option>EXW - Ex Works</option>
            <option>FCA - Free Carrier</option>
            <option>DAP - Delivered at Place</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#090914]">
            Payment Terms
          </label>
          <select className="w-full px-3 py-2 border border-[#d5d5d7] rounded-[5px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary">
            <option>NET30 - 30 dager netto</option>
            <option>NET14 - 14 dager netto</option>
            <option>COD - Kontant ved levering</option>
          </select>
        </div>
      </div>
    </div>
  );
}