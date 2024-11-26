import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, ChevronRight } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-red-600 text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* About Section */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <h3 className="text-3xl font-bold">WarTech</h3>
                        </div>
                        <p className="text-sm leading-relaxed opacity-90">
                            Portal berita teknologi terkini yang menyajikan informasi terpercaya seputar gadget,
                            gaming, software, dan perkembangan teknologi di Indonesia dan dunia.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-xl mb-6 text-white border-b border-red-500 pb-3">Kategori</h4>
                        <ul className="space-y-3">
                            {['Gadget', 'Gaming', 'Software', 'Internet', 'Sains'].map(category => (
                                <li key={category}>
                                    <a
                                        href="#"
                                        className="flex items-center group text-sm hover:text-red-200 transition-colors"
                                    >
                                        <ChevronRight
                                            size={16}
                                            className="mr-2 text-red-300 group-hover:text-red-100 transition-colors"
                                        />
                                        {category}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Info */}
                    <div>
                        <h4 className="font-semibold text-xl mb-6 text-white border-b border-red-500 pb-3">Perusahaan</h4>
                        <ul className="space-y-3">
                            {['Tentang Kami', 'Tim Redaksi', 'Kebijakan Privasi', 'Pedoman Media', 'Kontak'].map(item => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="flex items-center group text-sm hover:text-red-200 transition-colors"
                                    >
                                        <ChevronRight
                                            size={16}
                                            className="mr-2 text-red-300 group-hover:text-red-100 transition-colors"
                                        />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h4 className="font-semibold text-xl mb-6 text-white border-b border-red-500 pb-3">Hubungi Kami</h4>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-white mb-1">Email</p>
                                <p className="text-sm opacity-90">redaksi@wartech.com</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white mb-1">Phone</p>
                                <p className="text-sm opacity-90">(021) 555-0123</p>
                            </div>
                            <div className="flex space-x-5 mt-6">
                                {[Facebook, Twitter, Instagram, Youtube, Mail].map((Icon, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="text-white hover:text-red-200 transition-colors"
                                    >
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-red-700 border-t border-red-500">
                <div className="container mx-auto px-6 py-5">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                        <p className="opacity-90">© {currentYear} WarTech. Seluruh hak cipta dilindungi undang-undang.</p>
                        <div className="mt-3 md:mt-0 space-x-4">
                            <a href="#" className="hover:text-red-200 transition-colors text-sm">Terms of Service</a>
                            <a href="#" className="hover:text-red-200 transition-colors text-sm">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;