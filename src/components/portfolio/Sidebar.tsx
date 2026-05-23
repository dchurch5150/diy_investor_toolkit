'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BriefcaseBusiness,
  Eye,
  BarChart2,
  Wrench,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const MOCK_USER = {
  name: 'Dave Church',
  initials: 'DC',
}

const NAV_LINKS = [
  { href: '/portfolio', label: 'Portfolio', icon: BriefcaseBusiness },
  { href: '/watchlists', label: 'Watchlists', icon: Eye },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/tools', label: 'Tools', icon: Wrench },
]

interface SidebarContentProps {
  collapsed?: boolean
  onClose?: () => void
  onToggleCollapse?: () => void
}

function SidebarContent({ collapsed = false, onClose, onToggleCollapse }: SidebarContentProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className={cn(
          'flex items-center border-b border-sidebar-border min-h-[52px]',
          collapsed ? 'justify-center px-2' : 'justify-between px-4'
        )}
      >
        {!collapsed && (
          <Link href="/" className="text-sm font-semibold text-sidebar-foreground hover:text-sidebar-foreground/80 transition-colors">
            DIY Investor
          </Link>
        )}
        {onClose ? (
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        ) : onToggleCollapse ? (
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        ) : null}
      </div>

      {/* User Avatar */}
      <div
        className={cn(
          'border-b border-sidebar-border',
          collapsed ? 'py-4 flex justify-center' : 'p-4'
        )}
      >
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
          <div className="h-8 w-8 rounded-full bg-sidebar-primary flex-shrink-0 flex items-center justify-center text-xs font-semibold text-sidebar-primary-foreground">
            {MOCK_USER.initials}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {MOCK_USER.name}
              </p>
              <p className="text-xs text-sidebar-foreground/50">Mock User</p>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 py-2.5 border-b border-sidebar-border">
          <div className="flex items-center gap-2 rounded-md bg-sidebar-accent px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-sidebar-foreground/50 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search ticker..."
              className="bg-transparent text-sm outline-none w-full text-sidebar-foreground placeholder:text-sidebar-foreground/40"
            />
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-0.5">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-md py-2 text-sm transition-colors',
                collapsed ? 'justify-center px-2' : 'px-3',
                active
                  ? 'bg-sidebar-accent text-sidebar-foreground font-medium'
                  : 'text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
            >
              <Icon
                className={cn('h-4 w-4 flex-shrink-0', active && 'text-sidebar-primary')}
              />
              {!collapsed && <span>{label}</span>}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden md:flex flex-col shrink-0 border-r border-sidebar-border bg-sidebar overflow-hidden transition-all duration-200',
          collapsed ? 'w-[56px]' : 'w-56'
        )}
      >
        <SidebarContent
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
        />
      </aside>

      {/* Mobile hamburger button */}
      <button
        className="md:hidden fixed top-3 left-3 z-40 p-2 rounded-md bg-sidebar border border-sidebar-border hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Mobile overlay drawer */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="absolute left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}
