"use client";

import { useState } from "react";
import { Button, Switch } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  FiUser,
  FiLock,
  FiBell,
  FiMonitor,
  FiTrash2,
  FiShield,
  FiMoon,
  FiSun,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";
import { useAuthStore } from "@/stores/authStore";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useUpdateUser } from "@/hooks/users/useUpdateUser";
import { Spinner } from "@/components/ui/Spinner";

// Work on all the save functionalites
// Save user profile isnt updating properly and it should also reflect changes in the side bar. Something should disable the button as well. it should only be enabled when it detects change.


export const SettingsClient = () => {
  const router = useRouter();

  const {
    update,
    isLoading: isUpdatingUser
  } = useUpdateUser();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { theme, toggleTheme } = useTheme();

  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const email = user?.email || "Signed in";

  const canDeleteAccount = deleteConfirmation === "DELETE";

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      await update(user.id, { first_name: firstName, last_name: lastName });

      toast.success("Profile updated successfully.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update profile.";

      toast.error(message);
    }
  };

  const handleChangePassword = () => {
    // You can route this to forgot/reset password flow later
    toast.info("Password change flow functionality coming soon.");
  };

  const handleDeleteAccount = async () => {
    if (!canDeleteAccount) return;

    try {
      setIsDeletingAccount(true);

      // Replace this with your real delete account API call later
      // await deleteAccount();

      logout();

      localStorage.removeItem("jotoken");
      localStorage.removeItem("jouser");

      toast.success("Your account has been deleted functionality coming soon.");
      router.push("/");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete account.";

      toast.error(message);
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">
          Settings
        </h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Manage your Joborg account, notification preferences, and app
          experience.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {/* Profile */}
        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--surface)] text-[var(--primary)]">
              <FiUser size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--text)]">
                Profile Information
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Update your personal account information.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--text)]">
                First name
              </label>
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Enter your first name"
                className="w-full rounded-[var(--radius-md)] border border-[var(--input-border)] bg-transparent px-4 py-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--text)]">
                Last name
              </label>
              <input
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Enter your last name"
                className="w-full rounded-[var(--radius-md)] border border-[var(--input-border)] bg-transparent px-4 py-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-[var(--text)]">
                Email address
              </label>
              <input
                value={email}
                disabled
                className="w-full rounded-[var(--radius-md)] border border-[var(--input-border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--muted)] outline-none disabled:cursor-not-allowed"
              />
              <p className="mt-2 text-xs text-[var(--muted)]">
                Email address cannot be changed yet.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              type="button"
              onPress={handleSaveProfile}
              // isDisabled
              className="rounded-[var(--radius-md)] bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)] cursor-pointer"
            >
              {isUpdatingUser ? (
                <Spinner size="sm" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--surface)] text-[var(--primary)]">
              <FiLock size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--text)]">
                Security
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Manage your password and account security.
              </p>
            </div>
          </div>

          <div className="mt-6 divide-y divide-[var(--border)]">
            <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-[var(--text)]">Password</p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Change or reset your password.
                </p>
              </div>

              <Button
                type="button"
                onPress={handleChangePassword}
                className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--primary)]"
              >
                Change Password
              </Button>
            </div>

            <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-[var(--text)]">
                  Email verification
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Your email verification status.
                </p>
              </div>

              <span className="inline-flex w-fit items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--surface)] text-[var(--primary)]">
              <FiBell size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--text)]">
                Notifications
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Manage how you receive alerts about tracker changes.
              </p>
            </div>
          </div>

          <div className="mt-6 divide-y divide-[var(--border)]">
            <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-[var(--text)]">
                  Email alerts
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Receive an email when a tracked career page changes.
                </p>
              </div>

              <Switch
                isSelected={emailAlertsEnabled}
                onChange={setEmailAlertsEnabled}
              />
            </div>

            <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-[var(--text)]">Alert email</p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Email address where tracker alerts are sent.
                </p>
              </div>

              <p className="text-sm font-semibold text-[var(--text)]">
                {email}
              </p>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--surface)] text-[var(--primary)]">
              <FiMonitor size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--text)]">
                Appearance
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Choose how Joborg looks for you.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-[var(--text)]">Theme</p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Switch between light and dark mode.
              </p>
            </div>

            <Button
              type="button"
              onPress={toggleTheme}
              className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--primary)]"
            >
              {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-[var(--radius-lg)] border border-red-200 bg-[var(--card)] p-5 shadow-sm dark:border-red-500/30 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
              <FiAlertTriangle size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--text)]">
                Danger Zone
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Irreversible and destructive account actions.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[var(--radius-md)] border border-red-200 bg-red-50 p-4 dark:border-red-500/30 dark:bg-red-500/10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-red-700 dark:text-red-300">
                  Delete account
                </p>
                <p className="mt-1 text-sm leading-6 text-red-600 dark:text-red-300/80">
                  Permanently delete your profile, trackers, changes, and alert
                  history. This action cannot be undone.
                </p>
              </div>

              <Button
                type="button"
                onPress={() => setIsDeleteModalOpen(true)}
                className="rounded-[var(--radius-md)] bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
                  <FiTrash2 size={22} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[var(--text)]">
                    Delete account?
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    This will permanently delete your account, trackers,
                    changes, and alert history. This action cannot be undone.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeletingAccount}
                className="rounded-[var(--radius-md)] p-2 text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Close delete account modal"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-[var(--text)]">
                Type DELETE to confirm
              </label>
              <input
                value={deleteConfirmation}
                onChange={(event) => setDeleteConfirmation(event.target.value)}
                placeholder="DELETE"
                className="w-full rounded-[var(--radius-md)] border border-[var(--input-border)] bg-transparent px-4 py-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              />
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                isDisabled={isDeletingAccount}
                onPress={() => setIsDeleteModalOpen(false)}
                className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-5 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface-hover)]"
              >
                Cancel
              </Button>

              <Button
                type="button"
                isDisabled={!canDeleteAccount || isDeletingAccount}
                onPress={handleDeleteAccount}
                className="rounded-[var(--radius-md)] bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeletingAccount ? "Deleting..." : "Delete Account"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};