function ChangePasswordForm() {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="current-password" className="block text-sm font-medium">
          Current Password
        </label>
        <input
          type="password"
          id="current-password"
          className="w-full p-2 border rounded-md"
          placeholder="********"
        />
      </div>
      <div>
        <label htmlFor="new-password" className="block text-sm font-medium">
          New Password
        </label>
        <input
          type="password"
          id="new-password"
          className="w-full p-2 border rounded-md"
          placeholder="********"
        />
      </div>
      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirm-password"
          className="w-full p-2 border rounded-md"
          placeholder="********"
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Change Password
        </button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
