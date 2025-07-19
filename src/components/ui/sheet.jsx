import * as React from "react"
import { cn } from "../../lib/utils"
import { X } from "lucide-react"

const Sheet = React.forwardRef(({ className, open, onOpenChange, ...props }, ref) => {
  if (!open) return null

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/50 animate-in fade-in md:hidden" 
        onClick={() => onOpenChange?.(false)}
      />
      <div
        ref={ref}
        className={cn(
          "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out animate-in slide-in-from-bottom duration-300 md:hidden",
          className
        )}
        {...props}
      />
    </>
  )
})
Sheet.displayName = "Sheet"

const SheetContent = React.forwardRef(({ side = "bottom", className, children, onClose, ...props }, ref) => {
  const sideClasses = {
    top: "inset-x-0 top-0 border-b",
    bottom: "inset-x-0 bottom-0 border-t rounded-t-[10px]",
    left: "inset-y-0 left-0 h-full w-3/4 border-r",
    right: "inset-y-0 right-0 h-full w-3/4 border-l",
  }

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <div
        ref={ref}
        className={cn(
          "fixed z-50 bg-background shadow-lg transition ease-in-out",
          sideClasses[side],
          className
        )}
        {...props}
      >
        <div className="relative">
          {side === "bottom" && (
            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-muted" />
          )}
          {side !== "bottom" && (
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10 p-1"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          )}
          {children}
        </div>
      </div>
    </Sheet>
  )
})
SheetContent.displayName = "SheetContent"

const SheetHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold text-foreground",
      className
    )}
    {...props}
  />
))
SheetTitle.displayName = "SheetTitle"

const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = "SheetDescription"

export {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
}