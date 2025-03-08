'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const Baitulmal = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    mobile: "",
    date: "",
    category: "Zakat&Fitra",
    image: null as File | null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!formData.image) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(formData.image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [formData.image]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert("Please enter your full name");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("mobile", formData.mobile);
    formDataObj.append("amount", formData.amount);
    formDataObj.append("date", formData.date);
    formDataObj.append("category", formData.category);
    if (formData.image) {
      formDataObj.append("image", formData.image);
    }

    try {
      const res = await fetch("/api/baitulmal", {
        method: "POST",
        body: formDataObj,
      });

      const responseText = await res.text();
      if (!res.ok) throw new Error(responseText);

      const data = JSON.parse(responseText);
      if (data.success) {
        alert(`Collect Receipt Next Day From Bilali Masjid Back Gate!!!!`);
        setFormData({
          name: "",
          amount: "",
          mobile: "",
          date: "",
          category: "Zakat&Fitra",
          image: null,
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert(error instanceof Error ? error.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${poppins.className} min-h-screen bg-gray-100`}>
      {/* Header Section */}
      <div className="text-center py-8 bg-white shadow-sm">
        <h1 className="text-3xl font-semibold text-gray-800">
          Madarsa Anwarul Quran <br />
          <span className="text-blue-600">Bilali Masjid Baitulmal</span>
        </h1>
      </div>

      {/* Barcode Section */}
      <div className="flex flex-col items-center mt-8 px-4">
        <div className="max-w-2xl w-full bg-white p-4 rounded-lg shadow">
          <Image 
            src="/barcode.gif" 
            width={600} 
            height={300} 
            alt="Payment Barcode"
            className="w-full h-auto"
            priority
          />
        </div>
        <h2 className="text-2xl font-bold text-red-600 mt-4">
          Scan & Pay
        </h2>
      </div>

      {/* Payment Form */}
      <div className="flex justify-center items-center py-12 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Payment Registration
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  title="Please enter a 10-digit mobile number"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="5000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Payment Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Payment Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Zakat&Fitra">Zakat&Fitra</option>
                  <option value="Madarsa Anwarul Quran">Madarsa Anwarul Quran</option>
                </select>
              </div>
              <div>
              <p>
              <span style={{ color: 'red' }}>Note : </span>Payments to the Madarsa are for <span style={{ color: 'red' }}>Imdaad</span> only, not for{' '}
  <span style={{ color: 'red' }}>Zakat</span> or <span style={{ color: 'red' }}>Fitra</span>.
</p>

              </div>

            

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Payment Receipt (JPG/PNG, max 5MB)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="w-full file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:text-sm file:font-medium"
                  />
                  {preview && (
                    <div className="w-16 h-16 relative border rounded overflow-hidden">
                      <Image
                        src={preview}
                        alt="Receipt preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Processing...
                </div>
              ) : (
                "Register Payment"
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            For Any Payment Queries Contact:
          </h3>
          <div className="flex items-center gap-3">
            <svg 
              className="w-6 h-6 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
              />
            </svg>
            <div>
              <p className="font-medium">Shoaib Khan</p>
              <p className="text-gray-600">Mobile: +91 93244 58770 </p>
              <p className="text-sm text-gray-500 mt-1">
                Available: 8 PM - 10 PM
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Note: Please carry payment screenshot to get Recepit at Bilali Masjid Back Gate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Baitulmal;
