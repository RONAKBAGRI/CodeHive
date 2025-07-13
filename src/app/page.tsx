import { SignInButton, SignOutButton } from "@clerk/nextjs"

function page() {
  return (
    <div>
      <SignInButton/>
      <SignOutButton/>
    </div>
  )
}

export default page
