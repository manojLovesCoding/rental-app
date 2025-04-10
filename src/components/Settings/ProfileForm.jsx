function ProfileForm() {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-2 border rounded-md"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-2 border rounded-md"
          placeholder="johndoe@example.com"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          className="w-full p-2 border rounded-md"
          placeholder="(123) 456-7890"
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
