import React from "react";

function VerificationPage() {
  return (
    <>
      <div>
        <div>
          <label>
            <input
              type="password"
              name="OldPassword"
              placeholder="Old Password"
            />
          </label>

          <label>
            <input
              type="password"
              name="NewPassword"
              placeholder="New Password"
            />
          </label>
        </div>

        <div>
          <label>
            <input
              type="password"
              name="ConfirmPassword"
              placeholder="Confirm Password"
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default VerificationPage;
