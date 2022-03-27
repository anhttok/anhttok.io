const CleanLayout = ({ children }) => {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 dark:text-white font-body">
      <main className="min-h-screen">{children}</main>
    </div>
  )
}

export default CleanLayout