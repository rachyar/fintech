// src/app/actions.ts

"use server"; // Menandakan ini adalah file Server Action

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Fungsi 'approveUser' kita
export async function approveUser(userId: string) {
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: async (name: string) => {
        const store = await cookieStore;
        return store.get(name)?.value;
      },
      set: async (name: string, value: string, options) => {
        const store = await cookieStore;
        store.set(name, value, options);
      },
      remove: async (name: string, options) => {
        const store = await cookieStore;
        store.set(name, '', options);
      },
    },
  });

  try {
    const { error } = await supabase
      .from('profiles')
      .update({ status: 1 }) // Set status menjadi 1 (Aktif)
      .eq('id', userId); // Di mana id cocok

    if (error) {
      throw new Error(`Gagal meng-update pengguna: ${error.message}`);
    }

    revalidatePath('/dashboard/admin');
    return { success: true };

  } catch (e: any) {
    return { success: false, message: e.message };
  }
}

// Ini adalah versi 'addTransaction' YANG BENAR (dengan category_id)
export async function addTransaction(formData: FormData) {
  // 1. Ambil data dari formulir, termasuk 'category_id'
  const description = formData.get('description') as string;
  const amount = parseFloat(formData.get('amount') as string);
  const type = formData.get('type') as string;
  
  // INI ADALAH BARIS BARU YANG PENTING
  const category_id_raw = formData.get('category_id') as string;
  const category_id = category_id_raw ? parseInt(category_id_raw) : null;

  if (!description || !amount || !type) {
    // Kita tidak validasi category_id karena boleh null
    return { success: false, message: 'Deskripsi, Jumlah, dan Tipe wajib diisi.' };
  }

  // 2. Buat Supabase client
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: async (name: string) => {
        const store = await cookieStore;
        return store.get(name)?.value;
      },
      set: async (name: string, value: string, options) => {
        const store = await cookieStore;
        store.set(name, value, options);
      },
      remove: async (name: string, options) => {
        const store = await cookieStore;
        store.set(name, '', options);
      },
    },
  });

  // 3. Dapatkan ID pengguna
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: 'Anda harus login.' };
  }

  try {
    // 4. Masukkan data ke tabel 'transactions'
    const { error } = await supabase
      .from('transactions')
      .insert({
        description: description,
        amount: amount,
        type: type,
        user_id: user.id, // Ini adalah kuncinya!
        category_id: category_id // Ini adalah kolom baru kita
      });

    if (error) {
      throw new Error(`Gagal menambah transaksi: ${error.message}`);
    }

    // 5. Revalidasi
    revalidatePath('/dashboard/user');
    return { success: true };

  } catch (e: any) {
    return { success: false, message: e.message };
  }
}

// Fungsi 'deleteTransaction'
export async function deleteTransaction(transactionId: number) {
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: async (name: string) => {
        const store = await cookieStore;
        return store.get(name)?.value;
      },
      set: async (name: string, value: string, options) => {
        const store = await cookieStore;
        store.set(name, value, options);
      },
      remove: async (name: string, options) => {
        const store = await cookieStore;
        store.set(name, '', options);
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: 'Anda harus login.' };
  }

  try {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', transactionId)
      .eq('user_id', user.id);

    if (error) {
      throw new Error(`Gagal menghapus transaksi: ${error.message}`);
    }

    revalidatePath('/dashboard/user');
    return { success: true };

  } catch (e: any) {
    return { success: false, message: e.message };
  }
}

// Fungsi 'updateTransaction'
export async function updateTransaction(
  transactionId: number,
  formData: FormData
) {
  const description = formData.get('description') as string;
  const amount = parseFloat(formData.get('amount') as string);
  const type = formData.get('type') as string;

  if (!description || !amount || !type) {
    return { success: false, message: 'Semua field wajib diisi.' };
  }

  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: async (name: string) => {
        const store = await cookieStore;
        return store.get(name)?.value;
      },
      set: async (name: string, value: string, options) => {
        const store = await cookieStore;
        store.set(name, value, options);
      },
      remove: async (name: string, options) => {
        const store = await cookieStore;
        store.set(name, '', options);
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: 'Anda harus login.' };
  }

  try {
    const { error } = await supabase
      .from('transactions')
      .update({
        description: description,
        amount: amount,
        type: type
      })
      .eq('id', transactionId)
      .eq('user_id', user.id);

    if (error) {
      throw new Error(`Gagal meng-update transaksi: ${error.message}`);
    }

    revalidatePath('/dashboard/user');
    return { success: true };

  } catch (e: any) {
    return { success: false, message: e.message };
  }
}

// Fungsi 'addCategory'
export async function addCategory(formData: FormData) {
  const name = formData.get('name') as string;
  const type = formData.get('type') as string;

  if (!name || !type) {
    return { success: false, message: 'Nama dan Tipe kategori wajib diisi.' };
  }

  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: async (name: string) => {
        const store = await cookieStore;
        return store.get(name)?.value;
      },
      set: async (name: string, value: string, options) => {
        const store = await cookieStore;
        store.set(name, value, options);
      },
      remove: async (name: string, options) => {
        const store = await cookieStore;
        store.set(name, '', options);
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: 'Anda harus login.' };
  }

  try {
    const { error } = await supabase
      .from('categories')
      .insert({ name: name, type: type, user_id: user.id });

    if (error) {
      if (error.code === '23505') {
        throw new Error(`Kategori "${name}" untuk tipe "${type}" sudah ada.`);
      }
      throw new Error(`Gagal menambah kategori: ${error.message}`);
    }

    revalidatePath('/dashboard/categories');
    return { success: true, message: 'Kategori berhasil ditambahkan!' };

  } catch (e: any) {
    return { success: false, message: e.message };
  }
}

// Fungsi 'deleteCategory'
export async function deleteCategory(categoryId: number) {
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: async (name: string) => {
        const store = await cookieStore;
        return store.get(name)?.value;
      },
      set: async (name: string, value: string, options) => {
        const store = await cookieStore;
        store.set(name, value, options);
      },
      remove: async (name: string, options) => {
        const store = await cookieStore;
        store.set(name, '', options);
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: 'Anda harus login.' };
  }

  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId)
      .eq('user_id', user.id);

    if (error) {
      throw new Error(`Gagal menghapus kategori: ${error.message}`);
    }

    revalidatePath('/dashboard/categories');
    revalidatePath('/dashboard/user');

    return { success: true };

  } catch (e: any) {
    return { success: false, message: e.message };
  }
}

export async function updateUserProfile(formData: FormData) {
  // 1. Ambil data nama
  const fullName = formData.get('full_name') as string;

  if (!fullName) {
    return { success: false, message: 'Nama lengkap tidak boleh kosong.' };
  }

  // 2. Buat Supabase client
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: async (name: string) => {
          const store = await cookieStore;
          return store.get(name)?.value;
        },
        set: async (name: string, value: string, options) => {
          const store = await cookieStore;
          store.set(name, value, options);
        },
        remove: async (name: string, options) => {
          const store = await cookieStore;
          store.set(name, '', options);
        },
      },
    }
  );

  // 3. Dapatkan ID pengguna
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: 'Anda harus login.' };
  }

  try {
    // 4. Update data di tabel 'profiles'
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', user.id);

    if (error) {
      throw new Error(`Gagal meng-update profil: ${error.message}`);
    }

    // 5. Revalidasi halaman profil
    revalidatePath('/dashboard/profile');
    return { success: true, message: 'Profil berhasil diperbarui!' };

  } catch (e: any) {
    return { success: false, message: e.message };
  }
}

// ===============================================
// AKSI BARU: Update Password Pengguna
// ===============================================
export async function updateUserPassword(formData: FormData) {
  // 1. Ambil data password
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirm_password') as string;

  // 2. Validasi sisi server
  if (password.length < 6) {
    return { success: false, message: 'Password harus minimal 6 karakter.' };
  }
  if (password !== confirmPassword) {
    return { success: false, message: 'Password dan konfirmasi tidak cocok.' };
  }

  // 3. Buat Supabase client
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: async (name: string) => {
          const store = await cookieStore;
          return store.get(name)?.value;
        },
        set: async (name: string, value: string, options) => {
          const store = await cookieStore;
          store.set(name, value, options);
        },
        remove: async (name: string, options) => {
          const store = await cookieStore;
          store.set(name, '', options);
        },
      },
    }
  );

  try {
    // 4. Update password di Supabase Auth
    // Ini adalah fungsi auth, bukan database
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      throw new Error(`Gagal meng-update password: ${error.message}`);
    }

    return { success: true, message: 'Password berhasil diperbarui!' };

  } catch (e: any) {
    return { success: false, message: e.message };
  }
}