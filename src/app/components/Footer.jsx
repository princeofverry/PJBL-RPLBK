import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-red-500 text-gray-200">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">WarTech</h3>
                        <p className="text-sm">
                            Portal berita teknologi terkini yang menyajikan informasi terpercaya seputar gadget,
                            gaming, software, dan perkembangan teknologi di Indonesia dan dunia.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4 text-white">Kategori</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Gadget</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Gaming</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Software</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Internet</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Sains</a></li>
                        </ul>
                    </div>

                    {/* Company Info */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4 text-white">Perusahaan</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Tentang Kami</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Tim Redaksi</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Kebijakan Privasi</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Pedoman Media</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Kontak</a></li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4 text-white">Hubungi Kami</h4>
                        <div className="space-y-2">
                            <p className="text-sm">Email: redaksi@wartech.com</p>
                            <p className="text-sm">Phone: (021) 555-0123</p>
                            <div className="flex space-x-4 mt-4">
                                <a href="#" className="hover:text-blue-400 transition-colors">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" className="hover:text-blue-400 transition-colors">
                                    <Twitter size={20} />
                                </a>
                                <a href="#" className="hover:text-blue-400 transition-colors">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="hover:text-blue-400 transition-colors">
                                    <Youtube size={20} />
                                </a>
                                <a href="#" className="hover:text-blue-400 transition-colors">
                                    <Mail size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                        <p>© {currentYear} WarTech. Seluruh hak cipta dilindungi undang-undang.</p>
                        <div className="mt-2 md:mt-0">
                            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                            <span className="mx-2">|</span>
                            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;